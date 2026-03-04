// Create backups bucket for db and s3 backups
resource "yandex_storage_bucket" "backups_bucket" {
  access_key = yandex_iam_service_account_static_access_key.create_delete_update_media_and_backups_buckets_service_account_static_access_key.access_key
  secret_key = yandex_iam_service_account_static_access_key.create_delete_update_media_and_backups_buckets_service_account_static_access_key.secret_key
  bucket = format("%s-backups", local.resource_name_prefix)
  max_size = var.backups_bucket_max_size_in_bytes
}

// Create service account that will be used to put backups
resource "yandex_iam_service_account" "backups_bucket_service_account" {
  folder_id = var.folder_id
  name      = format("%s-backups-bucket-service-account", local.resource_name_prefix)
}

// Grant storage.editor perms for backups_bucket_service_account to be able to put backups
resource "yandex_storage_bucket_iam_binding" "backups_bucket_backups_bucket_service_account_iam_binding" {
  bucket = yandex_storage_bucket.backups_bucket.bucket
  role = "storage.editor"

  members = [
    format("serviceAccount:%s", yandex_iam_service_account.backups_bucket_service_account.id)
  ]
}

// Configure security policy for backups bucket
resource "yandex_storage_bucket_policy" "backups_bucket_security_policy" {
  bucket = yandex_storage_bucket.backups_bucket.bucket
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Principal = {
            CanonicalUser = yandex_iam_service_account.backups_bucket_service_account.id
          }
          Action = [
            "s3:PutObject"
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition. 
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.backups_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.backups_bucket.bucket)
          ]
          Sid = format("%s-backups-bucket-write-and-delete-policy", local.resource_name_prefix)
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
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.backups_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.backups_bucket.bucket)
          ]
          Sid = format("%s-backups-bucket-delele-and-update-using-service-account", local.resource_name_prefix)
        },
        {
          Effect = "Allow"
          Principal = "*"
          Action = [
            "*"
          ]
          Resource  = [
              // Resource with "/*" grants permissons to objects in the bucket. There was a problem with resources definition. 
              // Service accounts can't manage object in bucket if resource with "/*" wasn't added. 
              format("arn:aws:s3:::%s/*", yandex_storage_bucket.backups_bucket.bucket),
              format("arn:aws:s3:::%s", yandex_storage_bucket.backups_bucket.bucket)
          ]
          Sid = format("%s-backups-bucket-list-policy", local.resource_name_prefix)
          Condition = {
            StringLike = {
              "aws:referer" = format("https://console.yandex.cloud/folders/*/storage/buckets/%s-backups*", local.resource_name_prefix)
            }
          }
        }
      ]
    }
  )
}