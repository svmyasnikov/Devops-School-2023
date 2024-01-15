provider "aws" {
  shared_credentials_files = var.aws_shared_credentials_files
  profile                  = var.aws_profile
  region                   = var.aws_region
}
