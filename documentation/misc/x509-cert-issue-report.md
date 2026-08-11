# x509 Cert Issue Report

## Context

When we were copying the Prod Env backups, we found out that the backups had stopped being created. To figure out what was going on, we connected to the virtual machine and tried to check the status using `kubectl get pods`, but we got the error: `tls: failed to verify certificate: x509: certificate has expired or is not yet valid`.


## The cause of the problem

When a cluster is created, a certificate is issued for one year. A year has passed since the cluster was created, so the certificate has expired.

## Solution
Solution was found in the kind issues: https://github.com/kubernetes-sigs/kind/issues/3492

Auth as sudo user
```bash
sudo bash
```

Go to the project repo folder
```bash
cd <project>-env
```

Get the cluster container name. We need the control-plane container.
```bash
docker ps
```

Check current certs state
```bash
devcontainer exec --workspace-folder . kubectl get pods -A
docker exec <project>-control-plane kubeadm certs check-expiration
```

Renew k8s certs
```bash
docker exec <project>-control-plane kubeadm certs renew all
```

Connect to the cluster container
```bash
docker exec -it <project>-control-plane bash
```

Go to the kubernetes folder
```bash
cd /etc/kubernetes/
```

Write new kubelet config and exit
```bash
kubeadm config print init-defaults > InitConfiguration.yaml
kubeadm kubeconfig user --config InitConfiguration.yaml --client-name system:node:<project>-control-plane > kubelet.conf
exit
```

Copy new cert from cluster to the host to be able to interact with cluster

```bash
docker cp "<project>-control-plane:/etc/kubernetes/admin.conf" ".<project>-cluster-kubeconfig.tmp"

SERVER_ADDRESS="$(devcontainer exec --workspace-folder . kubectl config view -o jsonpath='{.clusters[0].cluster.server}')"

devcontainer exec --workspace-folder . yq -i ".clusters[].cluster.server = \"$SERVER_ADDRESS\"" ".<project>-cluster-kubeconfig.tmp"

mv ".<project>-cluster-kubeconfig.tmp" ".<project>-cluster-kubeconfig"
```

```bash
devcontainer exec --workspace-folder . kubectl get pods -A
```

## Home site test

Connect to the VM

Auth as sudo user
```bash
sudo bash
```

Go to the project repo folder
```bash
cd home-env
```

Check that current cert works
```bash
devcontainer exec --workspace-folder . kubectl get pods -A
```

```
NAMESPACE            NAME                                         READY   STATUS      RESTARTS         AGE
kube-system          coredns-674b8bbfcf-2r728                     1/1     Running     2 (84d ago)      256d
kube-system          coredns-674b8bbfcf-m46cn                     1/1     Running     2 (84d ago)      256d
kube-system          etcd-home-control-plane                      1/1     Running     11 (84d ago)     256d
kube-system          kindnet-dnns6                                1/1     Running     2 (84d ago)      256d
kube-system          kube-apiserver-home-control-plane            1/1     Running     1015 (84d ago)   256d
kube-system          kube-controller-manager-home-control-plane   1/1     Running     1359 (25d ago)   110d
kube-system          kube-proxy-8nl8l                             1/1     Running     2 (84d ago)      256d
kube-system          kube-scheduler-home-control-plane            1/1     Running     1314 (25d ago)   256d
local-path-storage   local-path-provisioner-7dc846544d-q5sgs      1/1     Running     3 (84d ago)      256d
prod                 cert-manager-5c6949f875-mj2l7                1/1     Running     1095 (84d ago)   256d
prod                 cert-manager-cainjector-5b4b87b5b7-sp5nx     1/1     Running     1064 (84d ago)   256d
prod                 cert-manager-webhook-6bcf487c69-xnjng        1/1     Running     4 (84d ago)      256d
prod                 home-cms-nginx-6d59c86b84-f8bqd              1/1     Running     0                18d
prod                 home-cms-nginx-6d59c86b84-jjwgk              1/1     Running     0                18d
prod                 home-db-backupper-29771700-7xn6z             0/1     Completed   0                15h
prod                 home-env-synchronizer-29772600-fgp7p         0/1     Completed   0                28m
prod                 home-s3-backupper-29771700-s4254             0/1     Completed   0                15h
prod                 home-ui-nginx-6646b96bd8-kpngz               1/1     Running     0                2d21h
prod                 home-ui-nginx-6646b96bd8-qv4sc               1/1     Running     0                2d21h
prod                 home-url-shortener-nginx-6d848f86f4-fhvtk    1/1     Running     0                73d
prod                 ingress-nginx-controller-58f4c5584-dzgk5     1/1     Running     3 (84d ago)      256d
prod                 metrics-server-5dd7b49d79-9b7pv              1/1     Running     7 (84d ago)      256d
prod                 postgresql-0                                 1/1     Running     2 (84d ago)      256d
```

Check certs expiration
```bash
docker exec home-control-plane kubeadm certs check-expiration
```

```
CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 Nov 27, 2026 10:01 UTC   108d            ca                      no
apiserver                  Nov 27, 2026 10:01 UTC   108d            ca                      no
apiserver-etcd-client      Nov 27, 2026 10:01 UTC   108d            etcd-ca                 no
apiserver-kubelet-client   Nov 27, 2026 10:01 UTC   108d            ca                      no
controller-manager.conf    Nov 27, 2026 10:01 UTC   108d            ca                      no
etcd-healthcheck-client    Nov 27, 2026 10:01 UTC   108d            etcd-ca                 no
etcd-peer                  Nov 27, 2026 10:01 UTC   108d            etcd-ca                 no
etcd-server                Nov 27, 2026 10:01 UTC   108d            etcd-ca                 no
front-proxy-client         Nov 27, 2026 10:01 UTC   108d            front-proxy-ca          no
scheduler.conf             Nov 27, 2026 10:01 UTC   108d            ca                      no
super-admin.conf           Nov 27, 2026 10:01 UTC   108d            ca                      no

CERTIFICATE AUTHORITY   EXPIRES                  RESIDUAL TIME   EXTERNALLY MANAGED
ca                      Nov 25, 2035 10:01 UTC   9y              no
etcd-ca                 Nov 25, 2035 10:01 UTC   9y              no
front-proxy-ca          Nov 25, 2035 10:01 UTC   9y              no
```

Renew k8s certs
```bash
docker exec home-control-plane kubeadm certs renew all
```

```
[renew] Reading configuration from the "kubeadm-config" ConfigMap in namespace "kube-system"...
[renew] Use 'kubeadm init phase upload-config --config your-config-file' to re-upload it.

certificate embedded in the kubeconfig file for the admin to use and for kubeadm itself renewed
certificate for serving the Kubernetes API renewed
certificate the apiserver uses to access etcd renewed
certificate for the API server to connect to kubelet renewed
certificate embedded in the kubeconfig file for the controller manager to use renewed
certificate for liveness probes to healthcheck etcd renewed
certificate for etcd nodes to communicate with each other renewed
certificate for serving etcd renewed
certificate for the front proxy client renewed
certificate embedded in the kubeconfig file for the scheduler manager to use renewed
certificate embedded in the kubeconfig file for the super-admin renewed

Done renewing certificates. You must restart the kube-apiserver, kube-controller-manager, kube-scheduler and etcd, so that they can use the new certificates.
```

Connect to the cluster container
```bash
docker exec -it home-control-plane bash
```

Go to the kubernetes folder
```bash
cd /etc/kubernetes/
```

Write new kubelet config and exit
```bash
kubeadm config print init-defaults > InitConfiguration.yaml
kubeadm kubeconfig user --config InitConfiguration.yaml --client-name system:node:home-control-plane > kubelet.conf
exit
```

Copy new cert to be able to interact with cluster

```bash
docker cp "home-control-plane:/etc/kubernetes/admin.conf" ".home-cluster-kubeconfig.tmp"

SERVER_ADDRESS="$(devcontainer exec --workspace-folder . kubectl config view -o jsonpath='{.clusters[0].cluster.server}')"

devcontainer exec --workspace-folder . yq -i ".clusters[].cluster.server = \"$SERVER_ADDRESS\"" ".home-cluster-kubeconfig.tmp"

mv ".home-cluster-kubeconfig.tmp" ".home-cluster-kubeconfig"
```

Check current certs state
```bash
devcontainer exec --workspace-folder . kubectl get pods -A
```

```
NAMESPACE            NAME                                         READY   STATUS      RESTARTS         AGE
kube-system          coredns-674b8bbfcf-2r728                     1/1     Running     2 (84d ago)      256d
kube-system          coredns-674b8bbfcf-m46cn                     1/1     Running     2 (84d ago)      256d
kube-system          etcd-home-control-plane                      1/1     Running     11 (84d ago)     256d
kube-system          kindnet-dnns6                                1/1     Running     2 (84d ago)      256d
kube-system          kube-apiserver-home-control-plane            1/1     Running     1015 (84d ago)   256d
kube-system          kube-controller-manager-home-control-plane   1/1     Running     1359 (25d ago)   110d
kube-system          kube-proxy-8nl8l                             1/1     Running     2 (84d ago)      256d
kube-system          kube-scheduler-home-control-plane            1/1     Running     1314 (25d ago)   256d
local-path-storage   local-path-provisioner-7dc846544d-q5sgs      1/1     Running     3 (84d ago)      256d
prod                 cert-manager-5c6949f875-mj2l7                1/1     Running     1095 (84d ago)   256d
prod                 cert-manager-cainjector-5b4b87b5b7-sp5nx     1/1     Running     1064 (84d ago)   256d
prod                 cert-manager-webhook-6bcf487c69-xnjng        1/1     Running     4 (84d ago)      256d
prod                 home-cms-nginx-6d59c86b84-f8bqd              1/1     Running     0                18d
prod                 home-cms-nginx-6d59c86b84-jjwgk              1/1     Running     0                18d
prod                 home-db-backupper-29771700-7xn6z             0/1     Completed   0                17h
prod                 home-env-synchronizer-29772720-7cmw6         0/1     Completed   0                15m
prod                 home-s3-backupper-29771700-s4254             0/1     Completed   0                17h
prod                 home-ui-nginx-6646b96bd8-kpngz               1/1     Running     0                2d23h
prod                 home-ui-nginx-6646b96bd8-qv4sc               1/1     Running     0                2d23h
prod                 home-url-shortener-nginx-6d848f86f4-fhvtk    1/1     Running     0                74d
prod                 ingress-nginx-controller-58f4c5584-dzgk5     1/1     Running     3 (84d ago)      256d
prod                 metrics-server-5dd7b49d79-9b7pv              1/1     Running     7 (84d ago)      256d
prod                 postgresql-0                                 1/1     Running     2 (84d ago)      256d
```

```bash
docker exec home-control-plane kubeadm certs check-expiration
```

```
CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 Aug 10, 2027 10:30 UTC   364d            ca                      no
apiserver                  Aug 10, 2027 10:30 UTC   364d            ca                      no
apiserver-etcd-client      Aug 10, 2027 10:30 UTC   364d            etcd-ca                 no
apiserver-kubelet-client   Aug 10, 2027 10:30 UTC   364d            ca                      no
controller-manager.conf    Aug 10, 2027 10:30 UTC   364d            ca                      no
etcd-healthcheck-client    Aug 10, 2027 10:30 UTC   364d            etcd-ca                 no
etcd-peer                  Aug 10, 2027 10:30 UTC   364d            etcd-ca                 no
etcd-server                Aug 10, 2027 10:30 UTC   364d            etcd-ca                 no
front-proxy-client         Aug 10, 2027 10:30 UTC   364d            front-proxy-ca          no
scheduler.conf             Aug 10, 2027 10:30 UTC   364d            ca                      no
super-admin.conf           Aug 10, 2027 10:30 UTC   364d            ca                      no

CERTIFICATE AUTHORITY   EXPIRES                  RESIDUAL TIME   EXTERNALLY MANAGED
ca                      Nov 25, 2035 10:01 UTC   9y              no
etcd-ca                 Nov 25, 2035 10:01 UTC   9y              no
front-proxy-ca          Nov 25, 2035 10:01 UTC   9y              no
```