const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30*24*60*60*1000, //30 days
    keys: [keys.cookieKey] //randomly created key
}));
app.use(passport.initialize());
app.use(passport.session());

//Instead of importing and calling authRoutes function with parameter app:
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
//it can be done like this:
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    //Express will serve up production assets
    //like main.js file or main.css file!
    app.use(express.static('client/build')); //First check if there is a specific file that matches the requested route

    //Express will serve up the index.html file
    //if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


//use PORT in prod environment when the app is deployed in
//Heroku and takes the environment variables automatically
//in development use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
//url generated: https://desolate-reef-53275.herokuapp.com/

//In package.json configure in engines the node and npm versions
//we want Heroku to use

//In package.json configure in scripts -> start command to
//tell Heroku how ro start the app
