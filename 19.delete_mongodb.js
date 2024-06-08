const {dbConnect,dbClose} = require('./DBconnection/mongoDB.js')

async function main() {
    const teacher = await dbConnect("teachers"); 
    
    
    const result1 = teacher.deleteOne({name:"Het"})

    const result2 = teacher.deleteMany({
        $or:[
            {name:"Urvish"},
            {name:"Sahil"},
            {name:"Hemangi"},
        ]
    }
)

    console.log(await teacher.find({name:"Het"}).toArray());
    await dbClose();
}

main();