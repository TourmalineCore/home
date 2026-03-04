# home-cloud-private

## Getting Started
> Additional information about Yandex Cloud Terraform provider and Yandex Cloud resources can be found in documentation
 - [Yandex Cloud Terraform Provider](https://terraform-provider.yandexcloud.net)
 - [Yandex Cloud Documentation](https://yandex.cloud/en/docs)

### Create new folder in Yandex Cloud

1. Open [Yandex Cloud Console](https://console.yandex.cloud/cloud/)
2. Click "Create folder" button
3. Specify the folder name `home-prod`
4. Unselect "Create a default network" checkbox
5. Click "Create" button
6. When it is created switch to this folder in the left upper corner and proceed with the instruction in the new folder.


### Create S3 bucket for Terraform state

1. Open [Yandex Cloud Console](https://console.yandex.cloud)
2. Navigate to "Object Storage" service using the search (ALT + S)
3. Click "Create bucket" button
4. Specify the bucket name `home-prod-terraform-state`, set the maximum size of the bucket to 1 GB and select "Resticted" option for all access settings.
5. Specify labels:
project: home
environment: prod
6. Click "Create bucket" button

### Create Service Account

1. Open [Yandex Cloud Console](https://console.yandex.cloud)
2. Navigate to "Identity and Access Management" service using the search (ALT + S)
3. Click "Create service account" button
4. Specify the service account name `home-prod-terraform-service-account` and add `storage.admin`, `certificate-manager.editor`, `iam.editor`, `cdn.editor`, `compute.editor`, `resource-manager.admin`, `vpc.publicAdmin`, `vpc.privateAdmin`, `vpc.securityGroups.admin` roles
5. Specify labels:
project: home
environment: prod
6. Click "Create" button

### Create access keys

1. Open [Yandex Cloud Console](https://console.yandex.cloud)
2. Navigate to Identity and Access Management service using the search (ALT + S)
3. Select the created service account
4. Click the "Create new key" button to allow to create cloud resources.
5. In the menu that appears click "Create authorized key" button
6. Select "RSA_4096" Encryption algorithm
7. Click "Create" button
8. Click "Download file with keys" the created key and copy it to this repo folder.
9. Click "Close" button
10. Click the "Create new key" button to allow to write to `home-prod-terraform-state` bucket.
11. In the menu that appears click "Create static access key" button
12. Click "Create" button
13. Create a new file in this repo folder, name it "config.s3.tfbackend" and paste the created access key
```bash
access_key="PASTE_YOUR_ACCESS_KEY_HERE"
secret_key="PASTE_YOUR_SECRET_KEY_HERE"
```

### VSCode Dev Container

Open this repo's folder in VSCode, it might immediately propose you to re-open it in a Dev Container or you can click on Remote Explorer, find plus button and choose the Open Current Folder in Container option and wait when it is ready.

When your Dev Container is ready, the VS Code window will be re-opened. Open a new terminal in this Dev Container which will be executing the commands under this prepared Linux container where we have already pre-installed and pre-configured:
- Terraform to automatically create resources in the Yandex Cloud 

### Create SSH key

To create SSH that be used to log in into VM execute the following command:
> Note: SSH key should be named as project name + environment + ssh. Example: home-prod-ssh

```bash
ssh-keygen -t ed25519 -f YOUR_FILENAME
```

Example:
```bash
ssh-keygen -t ed25519 -f ./home-prod-ssh
```

Specify strong passphrase. Don't leave it empty!

## Terraform

### Terraform initializatin

To initialize terraform provider execute the following command:
```bash
terraform init -backend-config=config.s3.tfbackend -backend-config="bucket=home-prod-terraform-state"
```

### Terraform validation

To validate that your terraform configuration was written right execute the following command:
> terraform provider should be initialized
```bash
terraform validate
```

### Cloud ID and Folder ID

#### How to find Cloud ID

1. Open [Yandex Cloud Center](https://center.yandex.cloud/)
2. Cloud ID located near to the organization name

#### How to find Folder ID

1. Open [Management Console](https://console.yandex.cloud/cloud)
2. Select your folder from the list on the left.
3. Folder Id located near to the folder name.

### Applying terraform configuration

To apply terraform configuration execute the following command:
```bash
terraform apply -auto-approve \
    -var "cloud_id=YOUR_CLOUD_ID" \
    -var "folder_id=YOUR_FOLDER_ID" \
    -var "protected_resources_allowed_external_ip_addresses=YOUR_IP_ADRESSES" \
    -var "project=YOUR_PROJECT_NAME" \
    -var "environment=YOUR_ENVIRONMENT" \
    -var "ssh_port=YOUR_SSH_PORT" \
    -var "source_domain=YOUR_DOMAIN" \
    -var "cdn_domain=YOUR_CDN_DOMAIN" \
    -var "cdn_cache_time_in_seconds=YOUR_CDN_CACHE_TIME_IN_SECONDS" \
    -var "backups_bucket_max_size_in_bytes=YOUR_BACKUPS_BUCKET_MAX_SIZE_IN_BYTES" \
    -var "vm_cpu_cores_count=YOUR_VM_CPU_CORES_COUNT" \
    -var "vm_ram_in_gb=YOUR_VM_RAM_IN_GB" \
    -var "vm_guaranteed_cpu_share_in_percent=YOUR_VM_GUARANTEED_CPU_SHARE_IN_PERCENT"
```

Example:

```bash
terraform apply -auto-approve \
    -var "cloud_id=bkghec5qs2b774t1ewct" \
    -var "folder_id=bkghec5qs2b774t1ewct" \
    -var "protected_resources_allowed_external_ip_addresses=77.88.55.88/32" \
    -var "project=home" \
    -var "environment=prod" \
    -var "ssh_port=22" \
    -var "source_domain=domain.com" \
    -var "cdn_domain=cdn.domain.com" \
    -var "cdn_cache_time_in_seconds=3600" \
    -var "backups_bucket_max_size_in_bytes=214748364800" \
    -var "vm_cpu_cores_count=2" \
    -var "vm_ram_in_gb=5" \
    -var "vm_guaranteed_cpu_share_in_percent=50"
```
> 214748364800 bytes is 200 GB

### Destroying Cloud Resources

To destroy the cloud resources that were created using this terraform configuration execute the following command:
```bash
terraform destroy -auto-approve \
    -var "cloud_id=YOUR_CLOUD_ID" \
    -var "folder_id=YOUR_FOLDER_ID" \
    -var "protected_resources_allowed_external_ip_addresses=YOUR_IP_ADRESSES" \
    -var "project=YOUR_PROJECT_NAME" \
    -var "environment=YOUR_ENVIRONMENT" \
    -var "ssh_port=YOUR_SSH_PORT" \
    -var "source_domain=YOUR_DOMAIN" \
    -var "cdn_domain=YOUR_CDN_DOMAIN" \
    -var "cdn_cache_time_in_seconds=YOUR_CDN_CACHE_TIME_IN_SECONDS" \
    -var "backups_bucket_max_size_in_bytes=YOUR_BACKUPS_BUCKET_MAX_SIZE_IN_BYTES" \
    -var "vm_cpu_cores_count=YOUR_VM_CPU_CORES_COUNT" \
    -var "vm_ram_in_gb=YOUR_VM_RAM_IN_GB" \
    -var "vm_guaranteed_cpu_share_in_percent=YOUR_VM_GUARANTEED_CPU_SHARE_IN_PERCENT"
```


## After CDN domain was linked in domain names registry and cert validation was completed link it to the CDN
1. Open [Yandex Cloud Console](https://console.yandex.cloud)
2. Navigate to 'Cloud CDN' service using the search (ALT + S)
3. Select 'cdn.tourmalinecore.com'
4. Click 'Edit' button
5. Set Redirect Clients to 'HTTP to HTTPS'
6. Set Certificate type to 'Use from Certificate Manager'
7. Select 'home-prod-cdn-cert' as Certificate type
8. Make sure that 'Header value' is tourmalinecore.com

> Note: After CDN was created open it and make sure that ignore cookies and ingore query are set to false