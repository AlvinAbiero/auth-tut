const dotenv = require("dotenv");

dotenv.config();

export default config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 5000,
};
