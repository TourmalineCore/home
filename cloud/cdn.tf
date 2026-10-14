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
    // VK Cloud CDN API requires allowed http methods to be set explicitly when CDN resource is updated
    // Not every method is allowed for CDN resource by VK Cloud, ["GET", "HEAD", "OPTIONS"] was rejected with "some value of allowed_http_methods option is forbidden for this resource" error
    allowed_http_methods = {
      enabled = true
      value = ["GET", "HEAD"]
    }
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
  // after CNAME record for CDN domain points to VK Cloud CDN.
  // Until certificate is issued CDN resource can't be updated ("ssl_automated" error), so Let's Encrypt is enabled by variable after DNS is switched
  ssl_certificate = {
    type = var.cdn_lets_encrypt_enabled ? "lets_encrypt" : "not_used"
  }
}
