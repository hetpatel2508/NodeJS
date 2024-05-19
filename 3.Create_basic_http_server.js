const http = require('http');

http.createServer((req,res)=>{
    res.write("<div><h1>Het Patel</h1><h2>22BECE30273</h2></div>")
    res.end();
}).listen(6969);