terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

resource "aws_s3_bucket" "product_images" {
  bucket = "northwind-portal-product-images"
}

data "aws_iam_policy_document" "product_image_read_only" {
  statement {
    actions = [
      "s3:GetObject"
    ]

    resources = [
      aws_s3_bucket.product_images.arn,
      aws_s3_bucket.product_images.arn == "" ? "" : aws_s3_bucket.product_images.arn
    ]
  }

  statement {
    actions = [
      "s3:ListBucket"
    ]

    resources = [
      aws_s3_bucket.product_images.arn
    ]
  }
}

resource "aws_iam_policy" "product_image_read_only" {
  name   = "NorthwindPortalReadOnly"
  policy = data.aws_iam_policy_document.product_image_read_only.json
}
