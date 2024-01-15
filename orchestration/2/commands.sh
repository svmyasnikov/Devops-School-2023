### Clean-up
kubectl delete all --all -n miasnikov
kubectl delete pvc --all -n miasnikov
kubectl delete ingress --all -n miasnikov

### Create masked Gitlab variable
echo -n '[default]
aws_access_key_id=
aws_secret_access_key=' | openssl base64

### Setup AWS credentials
mkdir ~/.aws
echo $AWS_CREDENTIALS | base64 -d > ~/.aws/credentials
aws eks update-kubeconfig --name school --region eu-central-1

### Create Postgres Secret
kubectl create secret generic postgres-secret --from-literal=password=$POSTGRES_PASSWORD -n miasnikov

### Deploy Postgres
kubectl apply -f postgres.yaml -n miasnikov
kubectl apply -f backend.yaml -n miasnikov
kubectl apply -f frontend.yaml -n miasnikov
kubectl apply -f ingress.yaml -n miasnikov

### Create Registry Secret
kubectl create secret docker-registry regcred -n miasnikov \
  --docker-server=$MTR_REGISTRY \
  --docker-username=$MTR_USERNAME \
  --docker-password=$MTR_PASSWORD \
  --save-config \
  --dry-run=client \
  -o yaml | kubectl apply -f -

kubectl get events --sort-by='.metadata.creationTimestamp' -A