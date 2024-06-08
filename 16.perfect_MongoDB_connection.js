//on DBconnection folder file mongoDB.js

const {MongoClient} = require('mongodb');
const url = 'mongodb://admin:het2508@localhost:27017/?authSource=test';
const client = new MongoClient(url);

async function dbConnect(collectionName){
    try{
        await client.connect();
        const db = client.db('test');
        return db.collection(collectionName);        
    } catch(err){
        console.log("Error = "+err);
    } 
}

async function dbClose(){
    await client.close();
}

module.exports = {
    dbConnect,
    dbClose
};

//on test.js

const {dbConnect,dbClose} = require('./DBconnection/mongoDB.js')

async function main() {
    const teacher = await dbConnect("teachers");
    const doc = await teacher.findOne();
    console.log(doc);
    await dbClose();
}

main();