# Welcome to Skubestore 🤿

> A virtual store for selling scuba diving equipment specifically for diving into Kubernetes.  
> This project has evolved from running on Minikube to a Kubeadm-based cluster on AWS EC2 instances,  
> with additional components such as an AWS Load Balancer Controller, External DNS, and a full Jenkins CI/CD pipeline.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Technical Stack](#technical-stack)
- [Infrastructure & Deployment](#infrastructure--deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Challenges & Learnings](#challenges--learnings)
- [Usage](#usage)
- [Cleanup](#cleanup)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

Skubestore is a demo microservice-based application that showcases how cloud-native backend services can be packaged in containers and deployed onto Kubernetes. Initially built and tested with Minikube, it has migrated to an AWS-based cluster using **Kubeadm on EC2 instances**. The goal is to demonstrate modern DevOps practices in a realistic environment.

**Key Features**  
- **User Management**: Register and authenticate users  
- **Product Inventory**: Add, remove, and query scuba diving products  
- **Order Management**: Place orders, check statuses, and process payments  

---

## Architecture

Skubestore consists of **three backend microservices** plus a **frontend** (React) service:

- **User Service**  
  Manages registration, login, and user-related data.  

- **Product Service**  
  Maintains the product catalog and inventory data.

- **Order Service**  
  Handles ordering, payment processing, and order status.

- **Frontend (React)**  
  A separate service that communicates with the backend APIs to provide a user interface.

Each backend service connects to its own MySQL database instance (or schema, depending on your setup).  
The Kubernetes cluster is organized into two namespaces:  
- **skubestore-stage** (for staging and testing)  
- **skubestore-prod** (for production)

The **AWS Load Balancer Controller** manages external access via an ALB, and **External DNS** automatically creates or updates Route 53 DNS records based on Ingress annotations.

---

## Technical Stack

| Component        | Description                                           |
|------------------|-------------------------------------------------------|
| **Backend**      | Python (Flask), MySQL                                 |
| **Frontend**     | React, packaged as a separate service                 |
| **Container**    | Docker images for each microservice + frontend        |
| **Kubernetes**   | Kubeadm cluster on AWS EC2                            |
| **AWS Ingress**  | AWS Load Balancer Controller + External DNS           |
| **CI/CD**        | Jenkins pipeline with GitHub Webhooks                 |

### Backend Services

- Written in Python using Flask  
- Uses ConfigMaps and Secrets for database environment variables  
- Images are stored in a DockerHub registry  
- Includes an init container that checks database connectivity before starting the main container  

---

## Infrastructure & Deployment

1. **Kubeadm** is used to initialize the cluster on AWS EC2 instances.  
2. **AWS Load Balancer Controller** is installed to manage Ingress resources with an ALB.  
3. **External DNS** updates Route 53 DNS records automatically.  
4. **MySQL** runs in separate pods or external instances (depending on your configuration).  
5. **Jenkins** manages both CI and CD pipelines (see next section).  
6. A **Terraform folder** defines the infrastructure as code, relying on preconfigured AMIs for the Kubeadm cluster and the Jenkins instance.

All components run in two namespaces, **skubestore-stage** and **skubestore-prod**.

---

## CI/CD Pipeline

The Jenkins pipelines (stored in a separate repository called **Skubestore-devops**) handle both Continuous Integration (CI) and Continuous Deployment (CD).

**CI Pipeline**  
- Pulls the pipeline script from the Skubestore-devops repository  
- Triggers on changes to the main branch of the Skubestore repository via GitHub Webhook  
- Checks if any code changes were made since the last commit for each microservice  
- If there are changes, builds new Docker images using a rolling tag and latest tag  
- Pushes newly created images to DockerHub  
- Cleans up Docker storage in Jenkins

**CD Pipeline**  
- Pulls the pipeline script from the Skubestore-devops repository  
- Triggers on changes to the main branch of the Skubestore-devops repository or on completion of the CI pipeline  
- Checks if Kubernetes manifests have changed  
- Validates changed files using a dry-run argument  
- If valid, applies them to the **skubestore-stage** namespace and waits for the pods to be running  
- Once stable, promotes the same manifests to the **skubestore-prod** namespace

---

## Challenges & Learnings

### AWS-VPC-CNI
Using aws-vpc-cni is ideal for AWS-based Kubernetes clusters because it assigns ENIs to pods, enabling direct ALB-to-pod communication.  
However, due to incompatibility with EKS in this context, Skubestore uses **Flannel** as its CNI, and the ALB is configured in IP mode by exposing each service as **NodePort**.

### ProviderID
Kubeadm on AWS EC2 does not automatically populate the `providerID` field.  
This issue is overcome by creating a Linux service that patches each node with its instance ID. More information can be found in the **ProviderID** folder’s README.

### IRSA vs. Node Roles
In Kubeadm-based clusters, IAM Roles for Service Accounts (IRSA) must be manually configured.  
Because there is no built-in OpenID Connect (as found in EKS), Skubestore is currently using IAM roles for the entire node rather than IRSA for individual pods.

---

## Usage

After deploying the microservices and frontend in **skubestore-stage** or **skubestore-prod**, you can access the application via the following domains:

- **stage.skubestore.click** (staging environment)  
- **skubestore.click** (production environment)

These Route 53 records are automatically managed by External DNS. You can register new users, list products, place orders, and query order statuses by interacting with these domains.

---

## Cleanup

To remove Skubestore from your cluster, delete the Kubernetes resources from both **skubestore-stage** and **skubestore-prod** namespaces.  
You should also remove any Helm releases for the AWS Load Balancer Controller and External DNS if you no longer need them.  
Any AWS resources (such as the ALB or Route 53 records) may require manual cleanup, depending on your AWS configurations.  
Finally, you can tear down the entire infrastructure using the **Terraform** folder if you want a complete removal.

---

## Future Improvements

- **Persistent Storage**: Currently no persistent volumes are configured; adding AWS EBS or EFS could be a next step.  
- **Monitoring & Observability**: Integrating logging and monitoring solutions (e.g., Prometheus, Grafana, or ELK).  
- **Security Enhancements**: Leveraging IRSA in a more granular way if/when an OIDC provider is configured for Kubeadm.

---

## License

This project is licensed under the MIT License. Feel free to customize or extend it as needed.

---

**Happy Diving!**  
If you have any questions or feedback, please open an issue or reach out.
