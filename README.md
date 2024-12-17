# Welcome to Skubestore! 🤿

A virtual store for selling scuba diving equipment specifically for diving into Kubernetes 😉

## Architecture Overview

This application is architected in a microservice fashion, consisting of 3 services:

1. **User Service**
   - Handles user registration and logins
   - Connected to MySQL database
   - Manages user-related tables

2. **Product Service**
   - Manages inventory
   - Connected to MySQL database
   - Maintains product-related tables

3. **Order Service**
   - Handles order placements
   - Manages order status
   - Processes payments
   - Connected to MySQL database
   - Maintains order-related tables

An NGINX ingress sits on top of all these services and routes requests to the appropriate service based on the specific path requested.

## Technical Stack

### Backend Services
- Written in Python using the Flask framework
- All objects are in their own namespace called `skubestore`
- Uses ConfigMaps and Secrets for database environment variables
- All of the container images are pulled from my Dockerhub registry.
- Each deployment includes an init container that:
  - Checks database connection
  - Stops once connection is established
  - Allows app container to start

### Database
- Running MySQL 8.0.40-debian

## Running the Application

### Prerequisites
- Minikube installed and running on your machine
- `curl` installed in your terminal

### Deployment Steps
1. Clone the repository to your PC
2. Navigate to the `Running_the_app` folder
3. Execute the deployment script:
   ```bash
   ./deploy_all_manifests.sh
   ```
   This will deploy all necessary objects in Minikube under the `skubestore` namespace, This will take a few seconds. You will see that the minikube tunnel is running, do not close that terminal.

4. Test the application:
    - In another Terminal, run the following:
   ```bash
   ./testing_the_app.sh
   ```
   This script will:
   - Send curl commands to the services
   - Add items to the store inventory
   - Demonstrate user registration
   - Display orders and payments
   - Show order status

5. Cleanup:
   ```bash
   ./cleanup.sh
   ```
   This script will remove all objects from your Minikube environment when you're finished with the project

## Features
In addition to running the bash script, you cando all of the following things using curl command or Postman:
- View the inventory
- Register new users
- Add new products
- Place orders
- Check order status
- Process payments

## Important Notes
⚠️ Current Limitations:
- No persistent volume implementation (planned for future revisions)
- This is a demo application focusing on backend services and Kubernetes infrastructure. unfortunately, it is non functional a and just a proof of concept🐋