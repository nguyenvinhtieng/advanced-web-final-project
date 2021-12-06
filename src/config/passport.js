const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "459825136805-c1lbq1urssbu0risuki18c6uoja51o6n.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
      return done(null, profile);
    }
  )
);