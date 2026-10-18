# 006: Disk monitoring and alerts

## Status

On review (2026-08-04)

## Context

We need to be aware when we’re running out of free disk space so we can take action before the consequences of running out of space set in. We need to choose a tool that will continuously monitor the status of the virtual machine and send a notification if the used space exceeds a specified threshold.

## Solutions

### Prometheus

#### Resource usage (without configured monitoring)
NAME                                                     CPU          MEMORY
alertmanager-prometheus-kube-prometheus-alertmanager-0   2m           39Mi            
prometheus-grafana-697644b784-tlsbd                      31m          410Mi           
prometheus-kube-prometheus-operator-dd8fc6bd9-nhmp9      5m           23Mi            
prometheus-kube-state-metrics-789cd5856c-ghqmx           2m           18Mi            
prometheus-prometheus-kube-prometheus-prometheus-0       18m          256Mi           
prometheus-prometheus-node-exporter-v8t9n                4m           11Mi

TOTAL MEMORY: 757Mi (347Mi excluding Grafana)

#### Advantages

- [Helm-chart](https://github.com/prometheus-community/helm-charts/)
- Apache 2.0 license
- Declarative configuration
- Can monitor multiple virtual machines from a single central server
- Large community
- All required functionality is available in the free edition

#### Disadvantages

- High resource consumption

### VictoriaMetrics

#### Resource usage (without configured monitoring)

NAME                                                     CPU          MEMORY
vmagent-vmks-victoria-metrics-k8s-stack-74d89f6b67-nh8x7   10m          63Mi            
vmalert-vmks-victoria-metrics-k8s-stack-85d5b49cb6-vj487   15m          55Mi            
vmalertmanager-vmks-victoria-metrics-k8s-stack-0           2m           26Mi            
vmks-grafana-757cf4844b-n5hm7                              15m          372Mi           
vmks-kube-state-metrics-b85bcb4cd-fcrz9                    3m           19Mi            
vmks-prometheus-node-exporter-lkfmd                        3m           9Mi             
vmks-victoria-metrics-operator-799b7444f6-qpn26            23m          58Mi            
vmsingle-vmks-victoria-metrics-k8s-stack-bc8697fb9-n79qz   43m          195Mi

TOTAL MEMORY: 797Mi (425Mi excluding Grafana)

#### Advantages

- [Helm-chart](https://docs.victoriametrics.com/helm/victoria-metrics-k8s-stack)
- Apache 2.0 license
- Declarative configuration
- Can monitor multiple virtual machines from a single central server
- All required functionality is available in the free edition

#### Disadvantages

- High resource consumption

### NetData

netdata-child-24ff8                 63m          120Mi           
netdata-k8s-state-8c49cbf5d-7jg8m   71m          64Mi            
netdata-parent-5d585b85b7-cph5p     32m          82Mi 

TOTAL MEMORY: 266 Mi

#### Advantages

- [Helm-chart](https://learn.netdata.cloud/docs/netdata-agent/installation/kubernetes-helm-chart-reference#installing-via-our-helm-repository-recommended)
- Declarative configuration
- Can monitor multiple virtual machines from a single central server
- Memory consumption

#### Disadvantages

- GPL 3.0 license (would require changing the project's license)
- Some required features are only available after registering and connecting to NetCloud

### Self-coded solution

Bash or Python script

#### Advantages

- Helm-chart
- Declarative configuration
- Minimal memory consumption
- Flexible configuration with only the required functionality

#### Disadvantages

- Becomes harder to maintain as more metrics are added