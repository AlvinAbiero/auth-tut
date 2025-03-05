const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);

const app = express();
const dbURL = "mongodb://localhost:27017/tutorial_db";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async () => {
  try {
    await mongoose.connect(dbURL, dbOptions); // Updated to use mongoose.connect
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times.</h1>`
  );
});

app.listen(3000);
