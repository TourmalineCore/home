// Create backups bucket for db and s3 backups
// VK Cloud doesn't support bucket max size, so size of backups bucket isn't limited
resource "aws_s3_bucket" "backups_bucket" {
  bucket = format("%s-backups", local.resource_name_prefix)

  tags = {
    project = var.project
    environment = var.environment
  }
}

resource "aws_s3_bucket_acl" "backups_bucket_acl" {
  bucket = aws_s3_bucket.backups_bucket.id
  acl = "private"
}

// Create Object Storage account that will be used to put backups and get list of media bucket content
// VK Cloud Object Storage account has access to all buckets of the project by default, access is restricted by bucket policies
resource "vkcs_iam_s3_account" "backups_bucket_account" {
  name = format("%s-backups-bucket", local.resource_name_prefix)
  description = "Object Storage account to put backups into backups bucket"
}

output "backups_bucket_access_key" {
  value = vkcs_iam_s3_account.backups_bucket_account.access_key
}

output "backups_bucket_secret_key" {
  value = vkcs_iam_s3_account.backups_bucket_account.secret_key
  sensitive = true
}

// Configure security policy for backups bucket
// In VK Cloud all actions are allowed for accounts of the project by default (implicit allow), so access is restricted by explicit deny only.
// Terraform account and VK Cloud Console users aren't restricted, so they are still able to manage bucket and restore backups.
// https://cloud.vk.ru/docs/ru/storage/s3/concepts/access/bucket-policy
resource "aws_s3_bucket_policy" "backups_bucket_security_policy" {
  bucket = aws_s3_bucket.backups_bucket.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        // denies any access to backups bucket using backups bucket account from anywhere except VM
        {
          Sid = format("%s-backups-bucket-deny-backups-account-outside-vm", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = ["s3:*"]
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.backups_bucket.bucket),
            format("arn:aws:s3:::%s/*", aws_s3_bucket.backups_bucket.bucket)
          ]
          Condition = {
            NotIpAddress = {
              "aws:SourceIp" = local.vm_ip_address_cidr
            }
          }
        },
        // denies to delete backups using backups bucket account, so backups can't be removed if VM is compromised
        {
          Sid = format("%s-backups-bucket-deny-backups-account-delete", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = [
            "s3:DeleteObject",
            "s3:DeleteObjectVersion"
          ]
          Resource = [
            format("arn:aws:s3:::%s/*", aws_s3_bucket.backups_bucket.bucket)
          ]
        },
        // denies to change bucket settings using backups bucket account to prevent bypass of this policy
        {
          Sid = format("%s-backups-bucket-deny-backups-account-bucket-management", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = local.bucket_management_actions
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.backups_bucket.bucket)
          ]
        },
        // media bucket account has nothing to do with backups
        {
          Sid = format("%s-backups-bucket-deny-media-account", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.media_bucket_account_principal
          }
          Action = ["s3:*"]
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.backups_bucket.bucket),
            format("arn:aws:s3:::%s/*", aws_s3_bucket.backups_bucket.bucket)
          ]
        }
      ]
    }
  )
}
