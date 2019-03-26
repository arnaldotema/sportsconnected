FROM node:11.10.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm update -g @angular/cli

# add app
COPY . /usr/src/app

# start app
CMD ng serve --host 0.0.0.0
EXPOSE 4200
