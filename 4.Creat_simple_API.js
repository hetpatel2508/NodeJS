const data = [
    {name:"Het Patel",e_mail:"Hetpatel@gmail.com",contact:9898},
    {name:"Urvish Patel",e_mail:"Urvishpatel@gmail.com",contact:6868},
    {name:"Dev Patel",e_mail:"Devpatel@gmail.com",contact:7878},
    {name:"Deep Patel",e_mail:"Deeppatel@gmail.com",contact:2828},
];

const http = require('http');

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application\json'});
    res.write(JSON.stringify(data));
    res.end();
}).listen(6969);