ARG AWS_CLI_VERSION=2.13.39

FROM amazon/aws-cli:${AWS_CLI_VERSION}

ARG AWS_CLI_VERSION=2.13.39
ARG KUBECTL_VERSION=1.27.7
ARG YQ_VERSION=4.35.2
ARG HELM_VERSION=3.13.2
ARG HELMFILE_VERSION=0.144.0
ARG HELM_DIFF_VERSION=3.8.1
ARG HELM_SECRETS_VERSION=4.5.1
ARG TARGETOS=linux
ARG TARGETARCH=amd64

RUN yum update -y \
    && yum install -y tar gzip wget jq git \
    && yum clean all \
    && rm -rf /var/cache/yum \
    && wget -q https://storage.googleapis.com/kubernetes-release/release/v${KUBECTL_VERSION}/bin/${TARGETOS}/${TARGETARCH}/kubectl -O /usr/local/bin/kubectl \
    && wget -q https://get.helm.sh/helm-v${HELM_VERSION}-${TARGETOS}-${TARGETARCH}.tar.gz -O - | tar -xzO ${TARGETOS}-${TARGETARCH}/helm > /usr/local/bin/helm \
    && wget -q https://github.com/mikefarah/yq/releases/download/v${YQ_VERSION}/yq_${TARGETOS}_${TARGETARCH} -O /usr/local/bin/yq \
    && wget -q https://github.com/roboll/helmfile/releases/download/v${HELMFILE_VERSION}/helmfile_${TARGETOS}_${TARGETARCH} -O /usr/local/bin/helmfile \
    && chmod +x /usr/local/bin/helm /usr/local/bin/kubectl /usr/local/bin/yq /usr/local/bin/helmfile \
    && helm plugin install https://github.com/databus23/helm-diff --version ${HELM_DIFF_VERSION} \
    && helm plugin install https://github.com/jkroepke/helm-secrets --version ${HELM_SECRETS_VERSION} \
    && helm repo add "stable" "https://charts.helm.sh/stable" --force-update

LABEL aws_cli="${AWS_CLI_VERSION}"
LABEL kubectl="${KUBECTL_VERSION}"
LABEL helm="${HELM_VERSION}"
LABEL helmfile="${HELMFILE_VERSION}"
LABEL helm_diff="${HELM_DIFF_VERSION}"
LABEL helm_secrets="${HELM_SECRETS_VERSION}"