# # set the base image to build from
# FROM node:alpine

# # set working directory
# WORKDIR /app

# # copy package files
# COPY package.json ./
# COPY package-lock.json ./

# #RUN npm install --save react react-dom react-scripts

# # install app dependencies
# RUN npm install

# # copy everything to /app directory
# COPY ./ ./

# # run the app
# CMD ["npm", "start"]

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
COPY --from=builder /app/build ./
RUN npm install --only=production
CMD ["npm", "start"]