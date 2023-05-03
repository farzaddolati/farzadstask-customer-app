

# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/farzadstask-customer-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# docker run -p 4200:4200 farzadstaskcustomerapp:v1




# # Builder container to compile typescript
# FROM node:lts-alpine AS build
# WORKDIR /usr/src/app
 
# # Install dependencies
# COPY package.json .
# COPY package-lock.json .
# RUN npm ci
 
# # Copy the application source
# COPY . .
# # Build typescript
# RUN npm run build
 
 
 
# FROM nginx:stable-alpine
 
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/my-app /usr/share/nginx/html
 
# EXPOSE 4200







# ### STAGE 1: Build ###
# FROM node:18-alpine AS builder

# WORKDIR /usr/src/app

# COPY package.json package-lock.json ./

# RUN npm cache clean --force

# RUN npm install

# COPY . .

# RUN npm run build --prod

# FROM nginx:1.21.6-alpine

# COPY --from=builder /usr/src/app/dist/my-app /usr/share/nginx/html

# EXPOSE 4200