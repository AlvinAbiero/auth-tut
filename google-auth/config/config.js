const dotenv = require("dotenv");

dotenv.config();

export default config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  MONGO_URI: process.env.MONGO_URL,
  PORT: process.env.PORT || 5000,
};
