import { MongoClient } from 'mongodb';

const url = 'mongodb://admin:het2508@localhost:27017/?authSource=test';
const client = new MongoClient(url);

export async function dbConnect(collectionName) {
  try {
    await client.connect();
    const db = client.db('test');
    return db.collection(collectionName);
  } catch (err) {
    console.log("Error = " + err);
  }
}

export async function dbClose() {
  await client.close();
}