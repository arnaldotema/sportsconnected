FROM node:latest

RUN mkdir /server
WORKDIR /server

# install and cache app dependencies
COPY package.json /server/
RUN npm install

COPY . /server

EXPOSE 3000

ENV MONGO_URL "mongodb://mongo:27017/sports_connected"

ENTRYPOINT ["npm", "run"]

CMD ["start"]

# To run test is: docker-compose run server test