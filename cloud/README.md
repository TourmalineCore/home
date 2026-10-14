# home-cloud

## Getting Started
> Additional information about VK Cloud Terraform provider and VK Cloud resources can be found in documentation
 - [VK Cloud Terraform Provider](https://registry.terraform.io/providers/vk-cs/vkcs/latest/docs)
 - [VK Cloud Documentation](https://cloud.vk.ru/docs/en)
 - [Managing VK Object Storage using AWS Terraform Provider](https://cloud.vk.ru/docs/en/tools-for-using-services/terraform/how-to-guides/aws)

### Create new project in VK Cloud

1. Open [VK Cloud Console](https://msk.cloud.vk.com/app/)
2. Click on the current project name in the upper left corner and click "Create project" button
3. Specify the project name `home-prod`
4. Click "Create" button and switch to the created project.

### Create S3 bucket for Terraform state

1. Open [VK Cloud Console](https://msk.cloud.vk.com/app/)
2. Navigate to "Object Storage" -> "Buckets" service
3. Click "Add bucket" button
4. Specify the bucket name `home-prod-terraform-state`, select "Hotbox" storage class and "private" default ACL
5. Click "Create bucket" button

### Create Object Storage access keys

Access keys are used to write to `home-prod-terraform-state` bucket and to create `home-prod-media` and `home-prod-backups` buckets.

1. Open [VK Cloud Console](https://msk.cloud.vk.com/app/)
2. Navigate to "Object Storage" -> "Accounts" service
3. Click "Add account" button, specify the account name `home-prod-terraform` and click "Create" button
4. Copy "Access Key ID" and "Secret Key"
5. Create a new file in this repo folder, name it "config.s3.tfbackend" and paste the created access key
```bash
access_key="PASTE_YOUR_ACCESS_KEY_HERE"
secret_key="PASTE_YOUR_SECRET_KEY_HERE"
```

### Get VK Cloud credentials for Terraform

1. Open [VK Cloud Console](https://msk.cloud.vk.com/app/)
2. Click on the user name in the upper right corner and select "Project settings"
3. Open "Terraform" tab
4. Click "Download VKCS provider file" button, it contains `username` and `project_id` that should be used in terraform variables
5. Make sure that two-factor authentication is disabled for the user or create a separate user for terraform with "Project administrator" role, because VK Cloud Terraform provider uses login and password for authentication

### VSCode Dev Container

Open this repo's folder in VSCode, it might immediately propose you to re-open it in a Dev Container or you can click on Remote Explorer, find plus button and choose the Open Current Folder in Container option and wait when it is ready.

When your Dev Container is ready, the VS Code window will be re-opened. Open a new terminal in this Dev Container which will be executing the commands under this prepared Linux container where we have already pre-installed and pre-configured:
- Terraform to automatically create resources in the VK Cloud

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

### VM flavor

VK Cloud doesn't allow to set CPU cores count, RAM size and guaranteed CPU share separately, VM configuration is set by predefined flavor. 
List of available flavors can be found in VK Cloud Console on VM creation page. Example: `STD3-2-6` is 2 vCPU and 6 GB RAM.

### Applying terraform configuration

To apply terraform configuration execute the following command:
```bash
terraform apply -auto-approve \
    -var "vkcs_username=YOUR_VK_CLOUD_USERNAME" \
    -var "vkcs_password=YOUR_VK_CLOUD_PASSWORD" \
    -var "vkcs_project_id=YOUR_VK_CLOUD_PROJECT_ID" \
    -var "s3_access_key=YOUR_OBJECT_STORAGE_ACCESS_KEY" \
    -var "s3_secret_key=YOUR_OBJECT_STORAGE_SECRET_KEY" \
    -var "protected_resources_allowed_external_ip_addresses=YOUR_IP_ADRESSES" \
    -var "project=YOUR_PROJECT_NAME" \
    -var "environment=YOUR_ENVIRONMENT" \
    -var "ssh_port=YOUR_SSH_PORT" \
    -var "source_domain=YOUR_DOMAIN" \
    -var "cdn_domain=YOUR_CDN_DOMAIN" \
    -var "cdn_cache_time_in_seconds=YOUR_CDN_CACHE_TIME_IN_SECONDS" \
    -var "vm_flavor_name=YOUR_VM_FLAVOR_NAME"
```

Example:

```bash
terraform apply -auto-approve \
    -var "vkcs_username=user@domain.com" \
    -var "vkcs_password=password" \
    -var "vkcs_project_id=b5b7ffd4ef0547e5b222f44555dfXXXX" \
    -var "s3_access_key=access_key" \
    -var "s3_secret_key=secret_key" \
    -var "protected_resources_allowed_external_ip_addresses=77.88.55.88/32" \
    -var "project=home" \
    -var "environment=prod" \
    -var "ssh_port=22" \
    -var "source_domain=domain.com" \
    -var "cdn_domain=cdn.domain.com" \
    -var "cdn_cache_time_in_seconds=3600" \
    -var "vm_flavor_name=STD3-2-6"
```

Object Storage keys for media and backups buckets are available in terraform outputs:
```bash
terraform output media_bucket_access_key
terraform output -raw media_bucket_secret_key
terraform output backups_bucket_access_key
terraform output -raw backups_bucket_secret_key
```

### Destroying Cloud Resources

To destroy the cloud resources that were created using this terraform configuration execute the same command as for applying with `terraform destroy -auto-approve` instead of `terraform apply -auto-approve`.

> Note: Buckets can't be deleted if they contain objects. Remove objects from buckets before destroying.

## After CDN domain was linked in domain names registry
1. Add CNAME record for CDN domain that points to the CNAME shown in VK Cloud Console -> CDN -> CDN resource
2. Let's Encrypt certificate will be issued automatically when DNS changes have propagated
3. Open [VK Cloud Console](https://msk.cloud.vk.com/app/), navigate to "CDN", select the CDN resource and enable redirect from HTTP to HTTPS, because this option isn't supported by VK Cloud Terraform provider

## DDoS protection
DDoS protection for VM's public IP address can't be enabled using terraform in VK Cloud. Request it in VK Cloud Console or via VK Cloud support.
