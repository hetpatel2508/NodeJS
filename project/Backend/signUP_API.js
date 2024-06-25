import express from "express";
import * as mongoDB from "./mongoDB.js";
import cors from "cors";
import bodyParser from 'body-parser';
// import { json } from "stream/consumers";
// import { stringify } from "querystring";
// import * as mongoose from './Product_API_mongoose.js';
import {dbConnect,dbClose} from './Product_API_mongoose.js';
import jwt from "jsonwebtoken";
const jwtKey = 'e-comm';

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());

app.get("", async (req, res) => {
  const firstProjectUsers = await mongoDB.dbConnect("FirstProjectUsers");
  const data = await firstProjectUsers.find().toArray();
  res.send(data);
  await mongoDB.dbClose();
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const firstProjectUsers = await mongoDB.dbConnect("FirstProjectUsers");

  try {
    const result = await firstProjectUsers.insertOne({ name, email, password });

    if (result.acknowledged) {
      const { _id } = result.insertedId;
      const user = { _id, name, email};
      res.status(201).send(user);
      console.log("Inserted Successfully");
    } else {
      res.status(500).send({ errorMessage: "Error while inserting" });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal Server Error" });
  } finally {
    await mongoDB.dbClose();
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ errorMessage: "Email and password are required" });
  } 

  const firstProjectUsers = await mongoDB.dbConnect("FirstProjectUsers");

  try {
    let user = await firstProjectUsers.findOne(
      { email: email, password: password },
      { projection: { password: 0 } }
    );
    if (user) {
      res.status(200).send(user);
      console.log(user);
    } else {
      res.status(401).send({ errorMessage: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal Server Error" });
  } finally {
    await mongoDB.dbClose();
  }
});



app.post('/add-product', async (req, res) => {
  try {
    const FirstProjectProducts = await dbConnect();
    const product = new FirstProjectProducts(req.body);
    const result = await product.save();
    res.status(201).send(result);
  } catch (error) {
    console.error('Error while adding product:', error);
    res.status(500).send({ errorMessage: 'Error while adding product', details: error.message });
  } finally {
    await dbClose();
  }
});

app.get('/products',async (req,res)=>{
  try{

    const FirstProjectProducts = await dbConnect();
    const products = await FirstProjectProducts.find()
    if(products.length>0){
      res.status(201).send(products)
    }else{
      res.status(500).send({ errorMessage: "Error while finding" });
    }
  }catch(err){
    res.status(500).send({ errorMessage: 'Error : '+err });
  }finally{
    await dbClose;
  }
})

app.delete('/products/delete/:id', async (req,res)=>{
  console.log(req.params);
  const FirstProjectProducts = await dbConnect();
  let data = await FirstProjectProducts.deleteOne({_id:req.params.id});
  res.send(data);
  dbClose()
  })

app.get('/product/:id',async (req,res)=>{
  console.log(req.params);
  const FirstProjectProductsr = await dbConnect();
  let result = await FirstProjectProductsr.findOne({_id:req.params.id});
  res.send(result);
  dbClose()
})

app.put('/product/update/:id',async (req,res)=>{
  const FirstProjectProducts = await dbConnect();
  let result = await FirstProjectProducts.updateOne(
    {_id:req.params.id},
    {
      $set: req.body
    }
  )
  if(result){
    res.status(201).send(result);
  }
  dbClose()
})

app.get('/search/:key',async (req,res)=>{
  const FirstProjectProducts = await dbConnect();
  let result = await FirstProjectProducts.find({
    $or:[
      { name:{$regex:req.params.key} },
      { company:{$regex:req.params.key} },
    ]
  });
  res.send(result)
})

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
