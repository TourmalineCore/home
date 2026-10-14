// External network that provides internet access and floating ips
data "vkcs_networking_network" "external_network" {
  name = var.external_network_name
}

resource "vkcs_networking_network" "network" {
  name = format("%s-network", local.resource_name_prefix)
  tags = local.tags
}

resource "vkcs_networking_subnet" "subnet" {
  name = format("%s-%s", local.resource_name_prefix, var.zone)
  // local ip addresses
  cidr = "10.129.0.0/24"
  network_id = vkcs_networking_network.network.id
  tags = local.tags
}

// Router is required in VK Cloud to get access to internet and to use floating ip
resource "vkcs_networking_router" "router" {
  name = format("%s-router", local.resource_name_prefix)
  external_network_id = data.vkcs_networking_network.external_network.id
  tags = local.tags
}

resource "vkcs_networking_router_interface" "router_interface" {
  router_id = vkcs_networking_router.router.id
  subnet_id = vkcs_networking_subnet.subnet.id
}

// Security group with configured incoming and outcoming connections
resource "vkcs_networking_secgroup" "security_group" {
  name = format("%s-security-group", local.resource_name_prefix)
  // Default egress rules are replaced with explicit rule below
  delete_default_rules = true
  tags = local.tags
}

resource "vkcs_networking_secgroup_rule" "http" {
  security_group_id = vkcs_networking_secgroup.security_group.id
  description = "HTTP"
  direction = "ingress"
  protocol = "tcp"
  port_range_min = 80
  port_range_max = 80
  remote_ip_prefix = "0.0.0.0/0"
}

resource "vkcs_networking_secgroup_rule" "https" {
  security_group_id = vkcs_networking_secgroup.security_group.id
  description = "HTTPS"
  direction = "ingress"
  protocol = "tcp"
  port_range_min = 443
  port_range_max = 443
  remote_ip_prefix = "0.0.0.0/0"
}

// VK Cloud security group rule supports only one CIDR, so rule is created for every allowed ip address
resource "vkcs_networking_secgroup_rule" "ssh" {
  for_each = toset(split(",", nonsensitive(var.protected_resources_allowed_external_ip_addresses)))

  security_group_id = vkcs_networking_secgroup.security_group.id
  description = "SSH"
  direction = "ingress"
  // VK Cloud requires protocol to be specified if port is specified
  protocol = "tcp"
  port_range_min = tonumber(var.ssh_port)
  port_range_max = tonumber(var.ssh_port)
  remote_ip_prefix = each.value
}

resource "vkcs_networking_secgroup_rule" "internet" {
  security_group_id = vkcs_networking_secgroup.security_group.id
  description = "Internet"
  direction = "egress"
  // protocol and ports are omitted to allow any traffic
  remote_ip_prefix = "0.0.0.0/0"
}

// Static ip address for VM
// DDoS protection can't be configured using terraform in VK Cloud, it should be requested in VK Cloud Console or via support
resource "vkcs_networking_floatingip" "ip_address" {
  pool = data.vkcs_networking_network.external_network.name
  description = format("%s static ip address", local.resource_name_prefix)
}

locals {
  vm_ip_address = vkcs_networking_floatingip.ip_address.address
  // VM uses floating ip as source ip address for internet requests, so it's used in bucket policies
  vm_ip_address_cidr = format("%s/32", local.vm_ip_address)
}
