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
EXPOSE 80
RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]