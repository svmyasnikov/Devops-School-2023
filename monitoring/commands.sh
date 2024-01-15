### Setup via  prometheus-operator
brew install jsonnet
git clone https://github.com/prometheus-operator/kube-prometheus

./build.sh example.jsonnet
kubectl apply -f manifests/setup
kubectl apply -f manifests/

### Setup via basic yaml
kubectl apply -f prometheus.yaml -n miasnikov
kubectl port-forward deployment/prometheus 9090:9090 -n miasnikov
http://localhost:9090
