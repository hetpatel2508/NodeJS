const express = require('express');
const app = express();

const EventEmitter = require('events');
const event = new EventEmitter();

let count = 0;

event.on("countAPI",()=>{
    console.log("Count = "+(++count));
})

app.get('/',(req,res)=>{
    res.send("api called");
    event.emit("countAPI");
})

app.listen(6969)