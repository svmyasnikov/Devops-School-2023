ARG AWS_CLI_VERSION
FROM amazon/aws-cli:${AWS_CLI_VERSION}

ARG KUBE_VERSION
ARG HELM_VERSION
ARG YQ_VERSION
ARG TARGETOS
ARG TARGETARCH


RUN yum update -y \
    && yum install -y tar gzip wget jq \
    && yum clean all \
    && rm -rf /var/cache/yum \
    && wget -q https://storage.googleapis.com/kubernetes-release/release/v${KUBE_VERSION}/bin/${TARGETOS}/${TARGETARCH}/kubectl -O /usr/local/bin/kubectl \
    && wget -q https://get.helm.sh/helm-v${HELM_VERSION}-${TARGETOS}-${TARGETARCH}.tar.gz -O - | tar -xzO ${TARGETOS}-${TARGETARCH}/helm > /usr/local/bin/helm \
    && wget -q https://github.com/mikefarah/yq/releases/download/v${YQ_VERSION}/yq_${TARGETOS}_${TARGETARCH} -O /usr/local/bin/yq \
    && chmod +x /usr/local/bin/helm /usr/local/bin/kubectl /usr/local/bin/yq \
    && helm repo add "stable" "https://charts.helm.sh/stable" --force-update \
    && kubectl version --client \
    && helm version
