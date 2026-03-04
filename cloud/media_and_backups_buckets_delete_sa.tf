// Service account that can create, delete or update buckets
// This service account was created because we can't configure main service account perms in bucket's policy because we don't know its id.
resource "yandex_iam_service_account" "create_delete_update_media_and_backups_buckets_service_account" {
  name      = format("%s-delete-media-and-backups-buckets-service-account", local.resource_name_prefix)
}

// Grant storage.editor permission for created service account to create buckets
resource "yandex_resourcemanager_folder_iam_member" "create_delete_update_media_and_backups_buckets_service_account_iam" {
  folder_id = var.folder_id
  role      = "storage.editor"
  member    = "serviceAccount:${yandex_iam_service_account.create_delete_update_media_and_backups_buckets_service_account.id}"
}

// Grant media bucket admin role for created service account to be able to delete media bucket 
resource "yandex_storage_bucket_iam_binding" "media_bucket_create_delete_update_media_and_backups_buckets_service_account_role_binding" {
  bucket = yandex_storage_bucket.media_bucket.bucket
  role = "admin"

  members = [
    format("serviceAccount:%s", yandex_iam_service_account.create_delete_update_media_and_backups_buckets_service_account.id)
  ]
}

// Grant media bucket admin role for created service account to be able to delete backups bucket
resource "yandex_storage_bucket_iam_binding" "backups_bucket_create_delete_update_media_and_backups_buckets_service_account_role_binding" {
  bucket = yandex_storage_bucket.backups_bucket.bucket
  role = "admin"

  members = [
    format("serviceAccount:%s", yandex_iam_service_account.create_delete_update_media_and_backups_buckets_service_account.id)
  ]
}

// Create static access key for service account to use it when creating, updating or deleting buckets
resource "yandex_iam_service_account_static_access_key" "create_delete_update_media_and_backups_buckets_service_account_static_access_key" {
  service_account_id = yandex_iam_service_account.create_delete_update_media_and_backups_buckets_service_account.id
  description        = "static access key for creating and deleting media and backups buckets"
}