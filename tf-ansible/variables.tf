variable "aws_shared_credentials_files" {
  default = ["~/.aws/credentials"]
}

variable "aws_profile" {
  default = "terraform"
}

variable "aws_region" {
  default = "eu-central-1"
}

output "instance-dns" {
  value = aws_instance.gitlab-runner.public_dns
}
