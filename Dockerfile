## Build the application
FROM node:18.16.1 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY --chown=node:node . .

# Build the api and web app
RUN npm run build-docker

## Setup Nginx and serve the application
FROM nginx:1.25-alpine

# Copy built Angular files into Nginx public directory
COPY --chown=node:node --from=build /usr/src/app/dist/apps/web /usr/share/nginx/html

# Copy NestJS api built files
COPY --chown=node:node --from=build /usr/src/app/dist/apps/api /usr/src/api

# Copy Nginx configuration
COPY --chown=node:node ./nginx/conf/prod/default.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the application will be served
EXPOSE 80

# Start the Nginx server and NestJS API
# CMD ["sh", "-c", "nginx -g 'daemon off;' & node /usr/src/api/main.js"]
CMD ["nginx", "-g", "daemon off;"]
