### Setup AWS
aws configure --profile school
aws eks update-kubeconfig --name school --profile school
kubectl get nodes
kubectl get ns

### Generate yaml
kubectl create ns miasnikov --dry-run=client --output=yaml > namespace.yaml
kubectl create deployment nginx -n miasnikov --replicas=3 --image=nginx:1.25 --dry-run=client --output=yaml > deployment.yaml

### Apply yaml
kubectl apply -f namespace.yaml
kubectl apply -f deployment.yaml

### Validate
kubectl get all -n miasnikov
kubectl describe deployment nginx -n miasnikov

### Scale down and change image
kubectl scale deployment nginx --replicas=1 -n miasnikov
kubectl edit deployment nginx -n miasnikov
kubectl describe deployment nginx -n miasnikov

### Rollback and scale up
kubectl rollout history deployment nginx -n miasnikov
kubectl rollout undo deployment nginx --to-revision=1 -n miasnikov
kubectl scale deployment nginx --replicas=3 -n miasnikov

### Mongodb
kubectl apply -f mongo.yaml -n miasnikov

### Clean-up
kubectl delete all --all -n miasnikov
kubectl delete pvc --all -n miasnikov
kubectl delete ingress --all -n miasnikov