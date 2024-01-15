#!/usr/bin/env bash
sudo apt update -y
sudo apt install -y curl apt-transport-https
curl -fsSL https://packages.gitlab.com/runner/gitlab-runner/gpgkey | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.gitlab.com/runner/gitlab-runner/ubuntu/ $(lsb_release -cs) main"
sudo apt update -y
sudo apt install -y gitlab-runner
sudo gitlab-runner register \
  --non-interactive \
  --url "https://gitlab.devops.telekom.de" \
  --token "${token}" \
  --executor "shell" \
  --description "aws-shell-runner"
sudo gitlab-runner start
sudo gitlab-runner enable
