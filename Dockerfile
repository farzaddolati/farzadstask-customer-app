

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

# docker build --pull --rm -f "Dockerfile" -t farzadstaskcustomerapp:v2 "."
# docker run -p 4200:4200 farzadstaskcustomerapp:v2

