const express = require("express");

const app = express();

// app.use(middleware2);

function middleware1(req, res, next) {
  //   console.log("I am  middleware #1");

  //   const errObj = new Error("I am an error");
  req.customProperty = 100;

  next();
}

function middleware2(req, res, next) {
  //   console.log("I am  middleware #2");
  console.log(`The custom property value is: ${req.customProperty}`);
  req.customProperty = 600;
  next();
}

// function middleware3(req, res, next) {
//   console.log("I am  middleware #3");
//   next();
// }

function errorHandler(err, req, res, next) {
  //   if (err) {
  //     res.send("<h1>There was an error, please try again!</h1>");
  //   }
  res.json({ err: err });
}

app.use(middleware1);
app.use(middleware2);

app.get("/", (req, res, next) => {
  console.log("I am the standard express function");
  res.send(`<h1>The value is ${req.customProperty}</h1>`);
});

app.use(errorHandler);

app.listen(3000);
