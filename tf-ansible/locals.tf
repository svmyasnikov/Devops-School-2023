locals {
  name = "gitlab-runner"

  vpc_cidr = "10.0.0.0/16"
  azs      = slice(data.aws_availability_zones.available.names, 0, 3)

  key_name    = local.name
  public_key  = file("~/.ssh/id_rsa.pub")
  private_key = file("~/.ssh/id_rsa")

  instance_type = "t2.micro"

  gitlab_token = file(".token")
  user_data = file("cloud-init.cfg")

  tags = {
    Name       = local.name
    Repository = "https://gitlab.devops.telekom.de/sergei.miasnikov/school-ci"
  }
}
