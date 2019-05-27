FROM node:11.10.0

RUN mkdir /chat
WORKDIR /chat

# install and cache app dependencies
COPY package.json /chat/package.json
RUN npm install

EXPOSE 5000

# add server
COPY . /chat