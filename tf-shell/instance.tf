# module "ec2_gitlab_runner" {
#   source  = "terraform-aws-modules/ec2-instance/aws"
#   version = "~> 2.0"

#   name                   = local.name
#   instance_count         = 1
#   ami                    = data.aws_ami.ubuntu22.id
#   instance_type          = "t2.micro"
#   vpc_security_group_ids = [aws_security_group.sg_gitlab.id]
#   subnet_id              = module.vpc.public_subnets[1]
#   user_data_base64       = base64encode(local.user_data)
#   tags                   = local.tags
# }

# SSH KEY
resource "aws_key_pair" "ssh-key" {
  key_name   = local.key_name
  public_key = local.public_key
}

# INSTANCE
resource "aws_instance" "gitlab-runner" {
  ami                    = data.aws_ami.ubuntu22.id
  instance_type          = local.instance_type
  subnet_id              = module.vpc.public_subnets[1]
  vpc_security_group_ids = [aws_security_group.sg_gitlab.id]
  key_name               = local.key_name
  user_data_base64       = base64encode(local.user_data)
  tags                   = local.tags

  connection {
    type        = "ssh"
    host        = self.public_ip
    private_key = local.private_key
  }
}
