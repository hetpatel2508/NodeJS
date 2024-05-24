const express = require('express');
const app = express();

app.get("",(req,res)=>{
    res.send("Welcome "+(req.query.name)+" !");     // for http://localhost:6969/?name=het it will print Welcome het ! 
})
app.get("/about",(req,res)=>{
    res.send("Welcome to about page !");
})
app.get('/help',(req,res)=>{
    res.send("Welcome to help page !");
})


app.listen(6969);