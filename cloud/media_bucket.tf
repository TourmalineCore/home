// Create media bucket for content
resource "aws_s3_bucket" "media_bucket" {
  bucket = format("%s-media", local.resource_name_prefix)

  tags = {
    project = var.project
    environment = var.environment
  }
}

resource "aws_s3_bucket_acl" "media_bucket_acl" {
  bucket = aws_s3_bucket.media_bucket.id
  acl = "private"
}

// Create Object Storage account that will be used to put or delete content
// VK Cloud Object Storage account has access to all buckets of the project by default, access is restricted by bucket policies
resource "vkcs_iam_s3_account" "media_bucket_account" {
  name = format("%s-media-bucket", local.resource_name_prefix)
  description = "Object Storage account to put or delete content in media bucket"
}

output "media_bucket_access_key" {
  value = vkcs_iam_s3_account.media_bucket_account.access_key
}

output "media_bucket_secret_key" {
  value = vkcs_iam_s3_account.media_bucket_account.secret_key
  sensitive = true
}

// Configure security policy for media bucket
// In VK Cloud all actions are allowed for accounts of the project by default (implicit allow), so access is restricted by explicit deny only.
// Terraform account and VK Cloud Console users aren't restricted, so they are still able to manage bucket.
// https://cloud.vk.ru/docs/ru/storage/s3/concepts/access/bucket-policy
resource "aws_s3_bucket_policy" "media_bucket_security_policy" {
  bucket = aws_s3_bucket.media_bucket.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        // denies any access to media bucket using media bucket account from anywhere except VM
        {
          Sid = format("%s-media-bucket-deny-media-account-outside-vm", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.media_bucket_account_principal
          }
          Action = ["s3:*"]
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.media_bucket.bucket),
            format("arn:aws:s3:::%s/*", aws_s3_bucket.media_bucket.bucket)
          ]
          Condition = {
            NotIpAddress = {
              "aws:SourceIp" = local.vm_ip_address_cidr
            }
          }
        },
        // denies to change bucket settings using media bucket account to prevent bypass of this policy
        {
          Sid = format("%s-media-bucket-deny-media-account-bucket-management", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.media_bucket_account_principal
          }
          Action = local.bucket_management_actions
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.media_bucket.bucket)
          ]
        },
        // denies any access to media bucket using backups bucket account from anywhere except VM
        {
          Sid = format("%s-media-bucket-deny-backups-account-outside-vm", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = ["s3:*"]
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.media_bucket.bucket),
            format("arn:aws:s3:::%s/*", aws_s3_bucket.media_bucket.bucket)
          ]
          Condition = {
            NotIpAddress = {
              "aws:SourceIp" = local.vm_ip_address_cidr
            }
          }
        },
        // backups bucket account is used by backupper to read content of media bucket, so any changes are denied
        {
          Sid = format("%s-media-bucket-deny-backups-account-write", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = local.object_write_actions
          Resource = [
            format("arn:aws:s3:::%s/*", aws_s3_bucket.media_bucket.bucket)
          ]
        },
        {
          Sid = format("%s-media-bucket-deny-backups-account-bucket-management", local.resource_name_prefix)
          Effect = "Deny"
          Principal = {
            AWS = local.backups_bucket_account_principal
          }
          Action = local.bucket_management_actions
          Resource = [
            format("arn:aws:s3:::%s", aws_s3_bucket.media_bucket.bucket)
          ]
        }
      ]
    }
  )
}
