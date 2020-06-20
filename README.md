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

## Code structure

This application uses Typscript everywhere.
