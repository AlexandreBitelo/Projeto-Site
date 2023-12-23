const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '716545865893-72fsub8r5l75iu318fj8pee32u6vfal3.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3030/google/callback",
  },

  
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
    /*
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      
      return cb(err, user);
    });
    */
    
  }
  
));

passport.serializeUser(function (user, done) {
  done (null, user);
});

passport.deserializeUser(function (user, done) {
  done (null, user);
})

