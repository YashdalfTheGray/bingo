[![Actions Status](https://github.com/YashdalfTheGray/bingo/workflows/Deploy%20to%20Amazon%20ECS/badge.svg)](https://github.com/YashdalfTheGray/bingo/actions)

# bingo

A thing that just generates bingo sheets

## Usage

The usage of this website is fairly simple. There are really only two views in the app - the generator page, and the card page.

### Generator page

This page just shows you a text box and a button. You enter the number of people playing and click the "Generate" button. This will generate a bunch of links under the button. You can either click the link to open the card for yourself or click the share button. This will copy the link to your clipboard and you can paste it to someone to share it.

### Card page

Once you get a link for a card, it will decode the card numbers from the query string, and render the card on the page. You can then click on each number to toggle the state of whether it is crossed off or not.

## Infrastructure

This app comes with a Docker container in the code. This means that you can run this application anywhere you could run a Docker container. The Github CI action deploys it to AWS Elastic Container Service but those files can easily be removed or modified to change the deployment target.

You will need to create a cluster with some capacity (or just use AWS Fargate). Once the Github action runs the first time, it will fail to update the service (it looks for a service called `bingo-service` in a cluster called `bingo`) but will publish the task definition. You can then use the task definition to create a service and the action will properly update it going forward.

Alternatively, you can spin up a service called `bingo-service` with another task definition (the AWS Fargate first run sample app, perhaps) to check that everything works in terms of infrastructure and then let Github actions update the service to the right task definition.

## Code structure

This application uses Typscript everywhere. The server uses Express.js and related tooling while the client code is transpiled using Babel, Typescript and SASS but does not use a frontend framework, rather it further extends a template string based component approach used [in this repository](https://github.com/YashdalfTheGray/yashdalfthegray.github.io).

The development build does use hot reloading for both Javascript/Typescript and CSS but it is not stateful as you might expect from something like hot loading built specifically for React.

The server code is stored in the `server` folder and the client code is stored in the `client` folder. There are some common modules that are stored in a `common` folder. We use a path alias to import components into files, for example, `import CardDetailRow from '@bingo/components/CardDetailRow`. Similar path aliases exist for the common folder (`@bingo/common`) and the client folder (`@bingo/client`).

## Useful NPM commands

The code in this repository comes with large number of npm scripts listed in the `package.json` file. To help bring some clarity, some of the most used commands are listed below.

- `npm start` - used to start the server and webpack in development mode (HMR enabled)
- `npm test` - used to run the unit tests, once
- `npm run tslint` - used to lint the entire project
- `npm run show-stats` - used to pull up the webpack statistics on package size and contents
- `npm run start:prod` - used to start the server and webpack in production mode (HMR disabled)
