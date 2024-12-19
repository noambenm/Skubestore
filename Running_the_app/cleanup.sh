#!/bin/sh

kubectl delete -f ../k8s/nginx-ingress.yml
kubectl delete -f ../k8s/order-deployment.yml
kubectl delete -f ../k8s/product-deployment.yml
kubectl delete -f ../k8s/user-deployment.yml
kubectl delete -f ../k8s/mysql-deployment.yml
kubectl delete -f ../k8s/secret.yml
kubectl delete -f ../k8s/configmap.yml
kubectl delete -f ../k8s/namespace.yml
minikube addons disable ingress
