FROM node:lts

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN npm test && npm run tslint
RUN npm run assets:prod && npm run server:prod

EXPOSE 8080

CMD [ "npm", "run", "start:docker" ]
