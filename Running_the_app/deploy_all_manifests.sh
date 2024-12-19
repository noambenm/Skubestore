#!/bin/sh
minikube addons enable ingress
kubectl apply -f ../k8s/namespace.yml
kubectl apply -f ../k8s/configmap.yml
kubectl apply -f ../k8s/secret.yml
kubectl apply -f ../k8s/mysql-deployment.yml
kubectl apply -f ../k8s/user-deployment.yml
kubectl apply -f ../k8s/product-deployment.yml
kubectl apply -f ../k8s/order-deployment.yml && sleep 10
kubectl apply -f ../k8s/nginx-ingress.yml && sleep 3
minikube tunnel