terraform {
  required_providers {
    vkcs = {
      source  = "vk-cs/vkcs"
      version = "~> 0.18"
    }

    // VK Cloud provider doesn't manage Object Storage buckets, so S3 compatible AWS provider is used for them.
    // VK Cloud documentation requires AWS provider version lower than 5.85.0
    // https://cloud.vk.ru/docs/en/tools-for-using-services/terraform/how-to-guides/aws
    aws = {
      source  = "hashicorp/aws"
      version = "< 5.85.0"
    }
  }

  required_version = ">= 1.1.5"

  backend "s3" {
    endpoints = {
      s3 = "https://hb.ru-msk.vkcloud-storage.ru"
    }

    region    = "ru-msk"
    key       = "terraform.tfstate"

    // Some of checks wasn`t realized in VK Cloud, so in this reason we`re skipping them
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
  }
}

// Credentials of VK Cloud user. Can be found in VK Cloud Console -> Project settings -> Terraform -> Download VKCS provider file
variable "vkcs_username" {
  type = string
  sensitive = true
}

variable "vkcs_password" {
  type = string
  sensitive = true
}

variable "vkcs_project_id" {
  type = string
  sensitive = true
}

// VK Cloud region. RegionOne is Moscow region
variable "vkcs_region" {
  type = string
  default = "RegionOne"
}

// Static access key of Object Storage account that is used to manage buckets (the same key is used for terraform state backend)
variable "s3_access_key" {
  type = string
  sensitive = true
}

variable "s3_secret_key" {
  type = string
  sensitive = true
}

// availability zone
variable "zone" {
  type = string
  default = "MS1"
}

// name of external network that provides internet access and floating ips. "internet" for Sprut SDN, "ext-net" for Neutron SDN
variable "external_network_name" {
  type = string
  default = "internet"
}

// name of project that will be used as part of name of every resource
variable "project" {
  type = string
  default = "home"
}

// name of environment that will be used as part of name of every resource
variable "environment" {
  type = string
  default = "prod"
}

locals {
  resource_name_prefix = format("%s-%s", var.project, var.environment)

  // VK Cloud supports only plain string tags instead of key-value labels
  tags = [
    format("project=%s", var.project),
    format("environment=%s", var.environment),
  ]
}

# List of IP's that have access to VM via SSH. Should be separated by commas without spacing. Example: 8.8.8.8/32,77.88.55.88/32
variable "protected_resources_allowed_external_ip_addresses" {
  type = string
  sensitive = true
}

variable "cdn_domain" {
  type = string
  sensitive = true
}

variable "source_domain" {
  type = string
  sensitive = true
}

variable "cdn_cache_time_in_seconds" {
  type = number
}

variable "ssh_port" {
  type = string
  sensitive = true
}

// VK Cloud has no custom cpu/ram/guaranteed cpu share configuration, only predefined flavors. Example: STD3-2-6 (2 vCPU, 6 GB RAM)
// https://cloud.vk.ru/docs/en/computing/iaas/concepts/about
variable "vm_flavor_name" {
  type = string
}

provider "vkcs" {
  username   = var.vkcs_username
  password   = var.vkcs_password
  project_id = var.vkcs_project_id
  region     = var.vkcs_region
  auth_url   = "https://infra.mail.ru:35357/v3/"
}

provider "aws" {
  region     = "ru-msk"
  access_key = var.s3_access_key
  secret_key = var.s3_secret_key

  // Some of checks wasn`t realized in VK Cloud, so in this reason we`re skipping them
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  skip_region_validation      = true

  endpoints {
    s3 = "https://hb.ru-msk.vkcloud-storage.ru"
  }
}
