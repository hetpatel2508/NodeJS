const express = require("express");
const path = require("path");
const app = express();
const ageRoute = express.Router();

const reqFilter = (req, res, next) => {
  if (!req.query.age) {
    res.send("Plase Enter Your Age...!");
  } else if (req.query.age <= 18) {
    res.send("You can't access this page, because under age...!");
  } else {
    next();
  }
};

ageRoute.use(reqFilter);

app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});

ageRoute.get("/support", (req, res) => {
  res.send("Welcome to support page!");
});

app.get("/about", (req, res) => {
  res.send("Welcome to about page!");
});

ageRoute.get("/help", (req, res) => {
  res.send("Welcome to help page!");
});

app.use("", ageRoute);

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
