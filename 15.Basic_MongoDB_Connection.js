const {MongoClient} = require('mongodb');
const url = 'mongodb://admin:het2508@localhost:27017/?authSource=test';
const client = new MongoClient(url);

async function getData(){
    try{
        await client.connect();
        const db = client.db('test');
        const coln = db.collection("teachers");

        const response = await coln.find().toArray();
        
        console.log(response[0]._id);
        console.log(response[0].name);
        console.log(response[0]);
        
    } catch(err){
        console.log("Error = "+err);
    } finally {
        await client.close();
    }
}

getData()

