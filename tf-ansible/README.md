# Install Gitlab runner in AWS Cloud

```
terraform init
terraform plan ec2.tfplan
terraform apply ec2.tfplan
ansible-playbook -i hosts --vault-password-file .vault install.yml
```
