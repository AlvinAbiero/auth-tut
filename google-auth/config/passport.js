const { compareSync } = require("bcryptjs");
const passport = require("passport");
const UserModel = require("./db");
const { config } = require("./config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, profile);
      UserModel.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return cb(err, null);

        if (!user) {
          let newUser = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
          });

          newUser.save();
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

// Persists user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Fetches session details using session id
passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});
