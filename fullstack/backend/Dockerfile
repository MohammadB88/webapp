# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i
# CMD ["npm", "run", "start"]

# Build stage
FROM node:alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY --from=build /app/build ./
RUN npm install --only=production
CMD ["npm", "start"]