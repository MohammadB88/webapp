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