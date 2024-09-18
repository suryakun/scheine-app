# Build stage
FROM node:22.3.0-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package.json ./
RUN pnpm install -r --offline

COPY . .

RUN pnpm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]