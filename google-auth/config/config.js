const dotenv = require("dotenv");

dotenv.config();

export default config = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  MONGO_URI: process.env.MONGO_URL,
  PORT: process.env.PORT || 5000,
  callbackURL: process.env.CALLBACK_URL,
};
