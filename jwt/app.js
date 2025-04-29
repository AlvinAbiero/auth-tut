const express = require("express");
const app = express();
const cors = require("cors");
const { hashSync, compareSync } = require("bcryptjs");
const UserModel = require("./config/database");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { issueJWT } = require("./utils/jwt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

require("./config/passport");

app.post("/register", (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      res.send({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

app.post("/login", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    // no user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user.",
      });
    }

    // Incorect password
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const jwt = issueJWT(user);

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

app.listen(5000, () => console.log("Listening to port 5000"));
