# set the base image to build from
FROM node:alpine

# set working directory
WORKDIR /app

# copy package files
COPY package.json ./
COPY package-lock.json ./

#RUN npm install --save react react-dom react-scripts

# install app dependencies
RUN npm install

# copy everything to /app directory
COPY ./ ./

# run the app
CMD ["npm", "start"]


# # Stage 1: build stage
# FROM node:alpine AS build
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# # Stage 2: production stage
# FROM node:alpine
# WORKDIR /app
# COPY --from=build /app/package.json ./
# COPY --from=build /app/package-lock.json ./
# RUN npm ci --production
# COPY --from=build /app/dist ./dist
# CMD ["npm", "start"]
