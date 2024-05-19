//file1.js
    module.exports={
        a:25,
        b:12,
        sum:(a,b)=>{
            return a+b;
        },
    }


//file2.js
    const f1 = require('./file1');

    f1.a=14;
    f1.b=54;

    console.log(f1.sum(f1.a,f1.b));