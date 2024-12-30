# Use an official Node.js runtime as a parent image
FROM node:20-alpine3.19 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for serving static files
FROM nginx:alpine

# 1) Remove any default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 2) Copy your custom config (placed at `nginx/default.conf`)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 3) Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
