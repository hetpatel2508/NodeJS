const express = require("express");
const app = express();

const redis = require("ioredis");
const redisClient = new redis();

app.get("/temp", async (req, res) => {
  const products = await redisClient.get("products");
  if(products){
    return res.send(JSON.parse(products));
  }
  else{

    const data = await fetch("https://dummyjson.com/products?limit=5");
    const result = await data.json();
    await redisClient.set("products", JSON.stringify(result));
    res.send(result);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
