const express = require("express");
const passport = require("passport");
const session = require("express-session");
const UserModel = require("./config/database");
const session = require("express-session");
const { hashSync } = require("bcrypt");
const MongoStore = require("connect-mongo");
const { default: config } = require("./config/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const mongoUrl = config.MONGO_URI;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require("./config/passport");

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
  res.render("login");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/protected",
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("protected", {
      name: req.user.name,
    });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
  console.log(req.session);
  console.log(req.user);
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
