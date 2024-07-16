const express = require("express");
const redis = require("redis");

const app = express();

let redisClient;

(async () => {
  redisClient = redis.createClient();

  await redisClient.connect();

  redisClient.on("error", (err) => {
    console.log("Error " + err);
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });
})();

app.get("/temp", async (req, res) => {
  const products = await redisClient.get("products");
  if(products){
    return res.send(JSON.parse(products));
  }
  else{

    const data = await fetch("https://dummyjson.com/products?limit=10");
    const result = await data.json();
    await redisClient.set("products", JSON.stringify(result));
    res.send(result);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
