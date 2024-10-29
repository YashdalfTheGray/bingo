FROM node:latest

# pull in the latest version of npm because we use lockfile version 2
RUN npm install --global npm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json /usr/src/app/
RUN npm install

# Print out some information about the environment
RUN node --version && npm --version && ./node_modules/.bin/tsc --version

# Bundle app source
COPY . /usr/src/app
RUN npm test && npm run eslint
RUN npm run assets:prod && npm run server:prod

EXPOSE 8080

CMD [ "npm", "run", "start:docker" ]
