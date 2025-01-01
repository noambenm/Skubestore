################################
## BUILD STAGE
################################
FROM node:20-alpine3.20 AS build

# Set the working directory inside the build container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the React app (output in /usr/src/app/dist)
RUN npm run build


################################
## PRODUCTION STAGE
################################
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy compiled build output from the "build" stage into Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
