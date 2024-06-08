const {dbConnect,dbClose} = require('./DBconnection/mongoDB.js')
const express = require("express");
const app = express();

app.use(express.json())

app.get('',async (req,res)=>{
    const teacher = await dbConnect("teachers");
    const data = await teacher.find().toArray();
    res.send(data)
    dbClose()
});

app.post('/', async (req, res) => {
  const teacher = await dbConnect("teachers");
  const result = await teacher.insertMany(req.body);
  if (result.acknowledged) {
    res.send(result);
    console.log("Inserted Successfully");
  } else {
    res.send('Error while inserting');
    console.log("Error while inserting");
  }
  dbClose();
});

app.put('/:name',async (req,res)=>{
  const teacher = await dbConnect("teachers");
  const result = teacher.updateOne(
    { name : req.params.name },
    {$set : req.body}
  )
  res.send({result})
})

app.delete('/:name',async (req,res)=>{
  const teacher = await dbConnect("teachers");
  const result = teacher.deleteOne(
    { name : req.params.name }
  )
  res.send({result})
})



app.listen(6969, () => {
    console.log("Server is running on port 6969");
});