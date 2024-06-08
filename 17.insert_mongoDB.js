const {dbConnect,dbClose} = require('./DBconnection/mongoDB.js')

async function main() {
    const teacher = await dbConnect("teachers");

    const result = await teacher.insertOne({
        name:"Het",
        age:20,
        gender:"male",
        salary:150000,
    });

    const result = await teacher.insertMany([
        {name:"Urvish",age:21,gender:"male",salary:180000},
        {name:"Sahil",age:20,gender:"male",salary:25000},
        {name:"Hemangi",age:19,gender:"female",salary:100000},
    ])

    console.log(result.acknowledged);
    // console.log(await teacher.find({name:"Het"}).toArray());
    await dbClose();
}

main();