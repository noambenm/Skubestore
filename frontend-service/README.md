# Skubestore 🤿 Vite + React frontend deployment:

---
## Overview  

This frontend is built and optimized via **Vite** for rapid development with the **React** plugin.
The build is served by **Nginx**.

---

## Environment Variables  

Before deploying to any environment - dev, staging, or production - ensure these variables in your `.env`:

1. **`VITE_USER_SERVICE_URL`**  
   URL of the **User** microservice.  
   - Example: `http://skubestore.click`, `http://user-service` or `http://localhost:5001`

2. **`VITE_PRODUCT_SERVICE_URL`**  
   URL of the **Product** microservice.  
   - Example: `http://skubestore.click`, `http://product-service` or `http://localhost:5000`

3. **`VITE_ORDER_SERVICE_URL`**  
   URL of the **Order** microservice.  
   - Example: `http://skubestore.click`, `http://order-service` or `http://localhost:5002`

> **Note:** Vite automatically exposes variables prefixed with `VITE_` to your frontend code.  
> Make sure to **rebuild the frontend** after changing these values.

---

## Nginx Configuration

This project includes a custom Nginx config to handle client-side routing - /nginx/default.conf

since React is a SPA (Single Page Application),
the custom nginx config file ensures non-root routes (e.g., /products, /about) do not 404 when directly accessed (such as a simple refresh).

> **Note:** The custom default.conf file contains hard-coded server port:
    **`listen 80;`**
            And hard-coded server name:
    **`server_name localhost;`**
    
> The custom nginx config file replaces the default.conf nginx config file during the image building phase in the Dockerfile.