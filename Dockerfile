# Stage 1: Build môi trường (Frontend và Backend)
FROM node:20-alpine AS builder

WORKDIR /app

# Cài đặt pnpm
RUN npm install -g pnpm

# Copy files package và thư mục patches (nếu có)
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install dependencies
RUN pnpm install

# Copy toàn bộ mã nguồn
COPY . .

# Build Frontend (Vite) và Backend (Esbuild)
RUN pnpm run build

# Stage 2: Production (Chạy app thực tế)
FROM node:20-alpine

WORKDIR /app

# Cài đặt pnpm
RUN npm install -g pnpm

# Chỉ copy package.json, lock file và patches
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Chỉ cài đặt các packages cần thiết cho Production (bỏ qua devDependencies)
RUN pnpm install --prod

# Copy thư mục build từ stage 1 sang
COPY --from=builder /app/dist ./dist

# Đảm bảo database mẫu có sẵn (nếu muốn)
COPY sqlite.db ./sqlite.db

# Thiết lập biến môi trường
ENV NODE_ENV=production
ENV PORT=3300

# Export cổng mạng 3300 ra ngoài
EXPOSE 3300

# Khởi chạy server
CMD ["npm", "start"]
