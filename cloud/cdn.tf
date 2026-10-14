resource "vkcs_cdn_origin_group" "origins_for_cdn" {
  name = format("Origins for %s", var.cdn_domain)

  origins = [
    {
      source = var.source_domain
    }
  ]
}

resource "vkcs_cdn_resource" "cdn_resource" {
  cname = var.cdn_domain
  // Let's Encrypt certificate can be issued only for active CDN resource
  active = true
  origin_protocol = "HTTPS"
  origin_group = vkcs_cdn_origin_group.origins_for_cdn.id

  options = {
    edge_cache_settings = {
      enabled = true
      value = format("%ds", var.cdn_cache_time_in_seconds)
    }
    ignore_cookie = false
    ignore_query_string = false
    host_header = {
      enabled = true
      value = var.source_domain
    }
  }

  // VK Cloud has no Certificate Manager, so CDN issues Let's Encrypt certificate itself
  // after CNAME record for CDN domain is added to DNS
  ssl_certificate = {
    type = "lets_encrypt"
  }
}
