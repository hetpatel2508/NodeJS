const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  if (!req.query.age) {
    res.send("Plase Enter Your Age...!");
  } else if (req.query.age <= 18) {
    res.send("You can't access this page, because under age...!");
  } else {
    next()
  }
});

app.get("",(req,res)=>{
    res.send("Welcome to HomePage")
})

app.get("/about", (req, res) => {
  res.send("Welcome to about page!");
});

app.get("/help", (req, res) => {
  res.send("Welcome to help page!");
});

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
