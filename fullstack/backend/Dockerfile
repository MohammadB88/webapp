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

ARG SRC_DIR=./src
ARG DIST_DIR=./dist
ENV SRC_DIR=${SRC_DIR} DIST_DIR=${DIST_DIR}

RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

ARG SRC_DIR=./src
ARG DIST_DIR=./dist
ENV SRC_DIR=${SRC_DIR} DIST_DIR=${DIST_DIR}

COPY --from=builder /app/${DIST_DIR} ./${DIST_DIR}
CMD ["npm", "run", "start:prod"]