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

<<<<<<< HEAD
# 3) Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
=======
# Copy compiled build output from the "build" stage into Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
>>>>>>> ba5615e (Update dockerfile since it woulnd't build)

# Expose port 80
EXPOSE 80

<<<<<<< HEAD
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
=======
# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
>>>>>>> ba5615e (Update dockerfile since it woulnd't build)
