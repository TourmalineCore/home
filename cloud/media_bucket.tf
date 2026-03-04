// Create media bucket for content
resource "yandex_storage_bucket" "media_bucket" {
  access_key = yandex_iam_service_account_static_access_key.create_delete_update_media_and_backups_buckets_service_account_static_access_key.access_key
  secret_key = yandex_iam_service_account_static_access_key.create_delete_update_media_and_backups_buckets_service_account_static_access_key.secret_key
  bucket = format("%s-media", local.resource_name_prefix)
}

// Create service account that will be used to put or delete content
resource "yandex_iam_service_account" "media_bucket_service_account" {
  folder_id = var.folder_id
  name      = format("%s-media-bucket-service-account", local.resource_name_prefix)
}

// Grant storage.editor perms for media_bucket_service_account to be able to put or delete content
resource "yandex_storage_bucket_iam_binding" "media_bucket_media_bucket_service_account_iam_binding" {
  bucket = yandex_storage_bucket.media_bucket.bucket
  role = "storage.editor"

  members = [
    format("serviceAccount:%s", yandex_iam_service_account.media_bucket_service_account.id)
  ]
}

// Grant storage.viewer perms for backups_bucket_service_account to be able to get list of content to create backup of the whole bucket
resource "yandex_storage_bucket_iam_binding" "media_bucket_backups_bucket_service_account_iam_binding" {
  bucket = yandex_storage_bucket.media_bucket.bucket
  role = "storage.viewer"

  members = [
    format("serviceAccount:%s", yandex_iam_service_account.backups_bucket_service_account.id)
  ]
}

// Configure security policy for media bucket
resource "yandex_storage_bucket_policy" "media_bucket_security_policy" {
  bucket = yandex_storage_bucket.media_bucket.bucket
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        // allows upload and delete content into media bucket from VM
        {
          Effect = "Allow"
          Principal = {
            CanonicalUser = yandex_iam_service_account.media_bucket_service_account.id
          }
          Action = [
            "s3:PutObject",
            "s3:DeleteObject",
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition.
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.media_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.media_bucket.bucket)
          ]
          Sid = format("%s-media-bucket-write-and-delete-policy", local.resource_name_prefix)
          Condition = {
            IpAddress = {
              "aws:sourceip" = local.vm_ip_address
            }
          }
        },
        // allows get list of content from media bucket for db backupper
        {
          Effect = "Allow"
          Principal = {
            CanonicalUser = yandex_iam_service_account.backups_bucket_service_account.id
          }
          Action = [
            "s3:ListBucket"
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition.
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.media_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.media_bucket.bucket)
          ]
          Sid = format("%s-media-bucket-list-policy", local.resource_name_prefix)
          Condition = {
            IpAddress = {
              "aws:sourceip" = local.vm_ip_address
            }
          }
        },
        // allows delete or update bucket using create_delete_update_media_and_backups_buckets_service_account
        {
          Effect = "Allow"
          Principal = {
            CanonicalUser = yandex_iam_service_account.create_delete_update_media_and_backups_buckets_service_account.id
          }
          Action = [
            "s3:ListBucket",
            "s3:GetBucketCORS",
            "s3:GetBucketWebsite",
            "s3:GetBucketVersioning",
            "s3:GetBucketLogging",
            "s3:GetLifecycleConfiguration",
            "s3:GetEncryptionConfiguration"            
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition.
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.media_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.media_bucket.bucket)
          ]
          Sid = format("%s-media-bucket-delele-and-update-using-service-account", local.resource_name_prefix)
        },
        // allow access to media bucket from Yandex Cloud Console
        {
          Effect = "Allow"
          Principal = "*"
          Action = [
            "*"
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition.
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.media_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.media_bucket.bucket)
          ]
          Sid = format("%s-media-bucket-list-policy", local.resource_name_prefix)
          Condition = {
            StringLike = {
              "aws:referer" = format("https://console.yandex.cloud/folders/*/storage/buckets/%s-media*", local.resource_name_prefix)
            }
          }
        }
      ]
    }
  )
}