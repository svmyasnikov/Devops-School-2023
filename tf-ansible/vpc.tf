module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = local.name
  cidr = local.vpc_cidr

  azs             = local.azs

  # private_subnets = ["10.0.0.0/20", "10.0.1.0/20", "10.0.2.0/20"]
  # public_subnets  = ["10.0.48.0/24", "10.0.49.0/24", "10.0.50.0/24"]
  # k = 0,1,2; mask = vpc_cidr mask + param2 = /16 + 4 = /20
  private_subnets = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 4, k)]
  public_subnets  = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 48)]

  enable_dns_hostnames    = true
  map_public_ip_on_launch = true

  tags = local.tags
}
