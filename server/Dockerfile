FROM node:11.10.0

RUN mkdir /server
WORKDIR /server

# install and cache app dependencies
COPY package.json /server/package.json
RUN npm install

EXPOSE 3000

# add server
COPY . /server
RUN npm start