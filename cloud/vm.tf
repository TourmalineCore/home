// Ubuntu 24.04 LTS image provided by VK Cloud
data "vkcs_images_image" "ubuntu" {
  visibility = "public"
  default    = true
  properties = {
    mcs_os_distro  = "ubuntu"
    mcs_os_version = "24.04"
  }
}

// Boot HDD with Ubuntu 24.04 LTS
resource "vkcs_blockstorage_volume" "vm-disk" {
  name = local.resource_name_prefix
  volume_type = "ceph-hdd"
  availability_zone = var.zone
  image_id = data.vkcs_images_image.ubuntu.id
  size = 32 // Gb

  metadata = {
    project = var.project
    environment = var.environment
  }
}

// Install VK Cloud monitoring agent. Service user for monitoring is created automatically
// https://cloud.vk.ru/docs/en/monitoring-services/monitoring
resource "vkcs_cloud_monitoring" "monitoring" {
  image_id = data.vkcs_images_image.ubuntu.id
}

resource "vkcs_compute_instance" "vm" {
  name = local.resource_name_prefix
  availability_zone = var.zone
  // VK Cloud flavor changing resizes VM with its stopping
  flavor_name = var.vm_flavor_name
  stop_before_destroy = true

  block_device {
    source_type = "volume"
    destination_type = "volume"
    uuid = vkcs_blockstorage_volume.vm-disk.id
    boot_index = 0
    delete_on_termination = false
  }

  network {
    uuid = vkcs_networking_network.network.id
  }

  security_group_ids = [vkcs_networking_secgroup.security_group.id]

  // VK Cloud has no hostname attribute, so it's set via cloud-init
  // SSH key is set via cloud-init too, because VK Cloud keypairs don't support ed25519 keys ("failed to generate fingerprint" error)
  // ssh key file should be named as project name + environment + ssh. Example: home-prod-ssh.pub
  user_data = format("#cloud-config\n%s", yamlencode({
    hostname = local.resource_name_prefix
    fqdn = local.resource_name_prefix
    ssh_authorized_keys = [trimspace(file(format("./%s-ssh.pub", local.resource_name_prefix)))]
  }))

  cloud_monitoring {
    service_user_id = vkcs_cloud_monitoring.monitoring.service_user_id
    script = vkcs_cloud_monitoring.monitoring.script
  }

  tags = local.tags

  // Subnet should be connected to router before VM creation to get access to internet
  depends_on = [
    vkcs_networking_router_interface.router_interface
  ]
}

// Bind static ip address to VM
resource "vkcs_compute_floatingip_associate" "vm_ip_address" {
  floating_ip = vkcs_networking_floatingip.ip_address.address
  instance_id = vkcs_compute_instance.vm.id
}
