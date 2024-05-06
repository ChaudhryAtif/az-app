## Build the application
FROM node:18.16.1 AS build
# Get pkg bin to build nodejs app into executable binary https://github.com/yao-pkg/pkg
RUN npm install -g @yao-pkg/pkg 
WORKDIR /build

COPY package*.json /build
RUN npm install

COPY --chown=node:node . .

RUN npm run build-docker

# use pkg to build nodejs app into executable binary
RUN pkg --compress GZip --targets node18-alpine -o api-linux ./dist/apps/api/main.js

FROM nginx:1.25-alpine AS prod

COPY ./nginx/conf/prod/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/apps/web /usr/share/nginx/html
COPY ./nginx/conf/custom_error_pages/502.html /usr/share/nginx/html/custom_error_pages/502.html

COPY --from=build /build/api-linux /api-linux

ENV BACKEND_PORT=3000
ENV GLOBAL_PREFIX=api

# Start the Nginx server and NestJS API
CMD ["sh", "-c", "nginx && /api-linux"]
