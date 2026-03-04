resource "yandex_cm_certificate" "cdn_cert" {
  name    = format("%s-cdn-cert", local.resource_name_prefix)
  domains = [format("%s", var.cdn_domain)]

  managed {
    challenge_type = "DNS_CNAME"
  }
}

resource "yandex_cdn_origin_group" "origins_for_cdn" {
  name = format("Origins for %s", var.cdn_domain)
  provider_type = "ourcdn"

  origin {
    source = var.source_domain
  }
}

resource "yandex_cdn_resource" "cdn_resource" {
  cname = var.cdn_domain
  provider_type = "ourcdn" // Yandex Cloud
  active = true
  origin_protocol = "https"

  origin_group_id = yandex_cdn_origin_group.origins_for_cdn.id
  options {
    // By default terraform sets empty string as secure key. Secure key was set to null to prevent this behavior.
    secure_key = null
    edge_cache_settings = var.cdn_cache_time_in_seconds
    ignore_cookie       = false
    ignore_query_params = false
    custom_host_header = var.source_domain
  }
} 