const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
