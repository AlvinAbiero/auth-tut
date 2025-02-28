const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { validPassword } = require("../lib/passwordUtils");
const User = connection.models.User;

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (username, password, cb) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return cb(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
    .catch((err) => {
      cb(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  User.findById(userId)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => cb(err));
});
