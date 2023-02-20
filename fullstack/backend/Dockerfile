# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i
# CMD ["npm", "run", "start"]

# Build stage
FROM node:alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start:prod"]