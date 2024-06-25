const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const jwtKey = "secret key is hetpatel"

app.use(cookieParser());

const varifyToken = (req, res, next) => {
    let token = req.headers['auth'];

    if(token){
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.send("Invalid Token");
            }else{
                next();
            }
        })
    }
    else {
        res.send("No Token Cookies Found !");
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
    res.send("Product Page")
})


app.get('/Order',varifyToken,(req,res)=>{
    res.status(200).send("Order Page  \nName = "+req.cookies['name']+"\nPassword = "+req.cookies['password']+"\nuserToken = "+req.cookies['userToken'])
})


app.get('/Cart', varifyToken, (req, res) => {
    res.status(200).send("Cart Page  \nName = " + req.cookies['name'] + "\nPassword = " + req.cookies['password']);
});



app.get('/login/:name/:password',(req,res)=>{

    const user = {
        'name': req.params.name,
        'password': req.params.password,
    }
    
    //jwt.sign({user},jwtKey,{expiresIn:'5h'})

    jwt.sign({user},jwtKey,(err,token)=>{
        if(err){
            res.send("token not created");
        }else{
            console.log(token);
            res.cookie("name", req.params.name, { httpOnly: false, secure: false });
            res.cookie("password", req.params.password, { httpOnly: false, secure: false });
            res.cookie("userToken",token, { httpOnly: false, secure: false });
            res.redirect('/');
        }
    })
    


})

app.get('/logout',(req,res)=>{
    res.clearCookie('name');
    res.clearCookie('password');
    res.clearCookie('userToken');
    res.redirect('/');
})

app.get('/check/:name/:password',(req,res)=>{
        if (req.params.name === req.cookies['name'] && req.params.password === req.cookies['password']) {
          res.redirect('/product');
        } else {
          res.send("Please Enter Correct Name & Password");
        }
})

app.listen(6969,()=>{
console.log("Server is running on port 6969");
})


/*

In JWT we need to pass aurh in header form localStorage from Frontend

    let result = await fetch("http://localhost:6969/add-product",{
    method:"post",
    body: JSON.stringify({naem,product,price});
    headers:{
        "Content-type" : "application/json",
        auth: `bearer ${JSON.parse(localstorage.getrItem('userToken'))}`
    }
    });

*/