const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//if we use model function with one argument it just retrieves the collection
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//configure passport to use Google for authentication
//go to console.developers.google.com, create new project and sign up for Google + API
passport.use(
  new GoogleStrategy(
        {
          clientID: keys.googleClientID,
          clientSecret: keys.googleClientSecret,
          callbackURL: '/auth/google/callback', //configure a route, that user will be redirected after authentication
          proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            //this function returns a promise
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
            //We already have a record with the given profile id
            //first argument of done function is an possible error
            return done(null, existingUser);
            }

            //A record with the given profile id doesn't exist, create a new record
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
  )
);
