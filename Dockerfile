## Build the application
FROM node:18.16.1 AS build

WORKDIR /build

COPY package*.json /build
RUN npm install

COPY --chown=node:node . .

RUN npm run build-docker

FROM node:18.16.1 AS prod

# Install nginx
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    && rm -rf /var/lib/apt/lists/*

COPY ./nginx/conf/prod/default.conf /etc/nginx/sites-enabled/default
COPY --chown=node:node --from=build /build/dist/apps/web /usr/share/nginx/html
COPY ./nginx/conf/custom_error_pages/502.html /usr/share/nginx/html/custom_error_pages/502.html

# Copy NestJS api built files

WORKDIR /app
COPY package*.json /app
RUN npm install --only=production --omit=dev
COPY --chown=node:node --from=build /build/dist/apps/api /app/api

ENV BACKEND_PORT=3000
ENV GLOBAL_PREFIX=api
# Start the Nginx server and NestJS API
CMD ["sh", "-c", "nginx && node api/main.js"]
