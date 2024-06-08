const { dbConnect, dbClose, url } = require("./DBconnection/mongoDB.js");
const path = require("path");
const express = require("express");
require('./DBconnection/mongoose_config.js');
const {teacher} = require('./DBconnection/teacher.js');
const app = express();

app.use(express.json())

app.get('/find', async (req,res)=>{
  let data = await teacher.find();
  res.send(data)
})

app.post('/insert',async (req,res)=>{
  let data = new teacher(req.body);
  const result = await data.save();
  res.send(result);
})

app.delete('/delete/:name', async (req,res)=>{
  console.log(req.params);
  let data = await teacher.deleteOne({name:req.params.name});
  res.send(data);
  })
  
app.put('/update/:name', async (req, res) => {
    const result = await teacher.updateOne(
      { name: req.params.name },
      { $set: req.body }
    );
    console.log(req.params);
    res.send({ result });
});

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});