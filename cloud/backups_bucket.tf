// Create backups bucket for db and s3 backups
// VK Cloud doesn't support bucket max size and bucket policies (no IP restrictions, no per-account permissions),
// so access is restricted by ACL only: bucket is private and is accessible only by accounts of the project.
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
// Note: VK Cloud Object Storage account has access to all buckets of the project
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
