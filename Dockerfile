FROM node:16-alpine3.16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:stable AS runner
RUN mkdir /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
RUN nginx -t
RUN service nginx start
CMD ["nginx", "-g", "daemon off;"]