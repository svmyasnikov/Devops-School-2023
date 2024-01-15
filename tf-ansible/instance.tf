# SSH KEY
resource "aws_key_pair" "ssh-key" {
  key_name   = local.key_name
  public_key = local.public_key
}

# INSTANCE
resource "aws_instance" "gitlab-runner" {
  ami                    = data.aws_ami.debian12.id
  instance_type          = local.instance_type
  subnet_id              = module.vpc.public_subnets[1]
  vpc_security_group_ids = [aws_security_group.sg_gitlab.id]
  key_name               = local.key_name
  user_data_base64       = base64encode(local.user_data)
  tags                   = local.tags
}

# Ansible Inventory 
resource "local_file" "ansible_inventory" {
  depends_on = [aws_instance.gitlab-runner]
  content  = templatefile("hosts.tftpl", { host = aws_instance.gitlab-runner.public_dns })
  filename = "${path.module}/hosts"
}