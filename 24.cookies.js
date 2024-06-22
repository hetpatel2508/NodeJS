const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const reqFilter = (req, res, next) => {
    if (req.cookies['name'] && req.cookies['password']) {
      next();
    } 
    else {
        res.send("No Cookies Found !");
    }
  };


app.get('/',(req,res)=>{
    const name = req.cookies['name'];
    if(name){
        res.status(200).send("Home Page \nName = "+name);
    }
    else{
        res.send("Cookie not found !");
    }
})


app.get('/Product',(req,res)=>{
    res.send("Product Page");
})


app.get('/Order',reqFilter,(req,res)=>{
    res.status(200).send("Order Page  \nName = "+req.cookies['name']+"\nPassword = "+req.cookies['password'])
})


app.get('/Cart',reqFilter,(req,res)=>{
    res.status(200).send("Cart Page  \nName = "+req.cookies['name']+"\nPassword = "+req.cookies['password'])
})



app.get('/login/:name/:password',(req,res)=>{
    res.cookie("name",req.params.name,{httpOnly:false,secure:false});
    res.cookie("password",req.params.password,{httpOnly:false,secure:false});
    res.redirect('/');
})

app.get('/logout',(req,res)=>{
    res.clearCookie('name');
    res.clearCookie('password');
    res.redirect('/');
})

app.listen(6969,()=>{
  console.log("Server is running on port 6969");
})