const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const UserModel = reuire('./db')
const passport = require('passport')

const opts = {
 jwtFromRequest:  fromAuthHeaderAsBearerToken(), // Extract token from Bearer header
 secretOrKey:  process.env.JWT_SECRET // Secret key for verification
}


passport.use(new JwtStrategy(opts, (jwt_payload, done) =>  {
    UserModel.findOne({id: jwt_payload.id},  (err, user) => {
        if (err) {
            return done(err, false)
        }

        if (user) {
            return done(null, user) // Payload contains user info
        } else {
            return done(null, false)
            // or you could create a new account
        }
    })
}))


module.exports = passport
