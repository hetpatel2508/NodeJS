const {dbConnect,dbClose} = require('./DBconnection/mongoDB.js')

async function main() {
    const teacher = await dbConnect("teachers");
    
    const result1 = await teacher.updateOne( {name:"Het",}, {
        $set:{
            salary:250000,
        }   
    });

    const result2 = await teacher.updateMany({}, [
        {
            $set: {
                salary: { $add: ["$salary", 1000] }
            }
        }
    ])


    console.log(await teacher.find({name:"Het"}).toArray());
    await dbClose();
}

main();