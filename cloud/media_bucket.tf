// Create media bucket for content
// VK Cloud doesn't support bucket policies (no IP restrictions, no per-account permissions), so access is restricted by ACL only:
// bucket is private and is accessible only by accounts of the project.
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
// Note: VK Cloud Object Storage account has access to all buckets of the project
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
