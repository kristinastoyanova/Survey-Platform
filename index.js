const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send({hi: 'there'});
});

//use PORT in prod environment when the app is deployed in
//Heroku and takes the environment variables automatically
//in development use 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);
//url generated: https://desolate-reef-53275.herokuapp.com/

//In package.json configure in engines the node and npm versions
//we want Heroku to use

//In package.json configure in scripts -> start command to
//tell Heroku how ro start the app