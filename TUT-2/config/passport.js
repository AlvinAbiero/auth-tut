const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const fs = require("fs");
const path = require("path");
const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, (payload, cb) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
    .catch((err) => cb(err, null));
});

// TODO
module.exports = (passport) => {
  passport.use(strategy);
};
