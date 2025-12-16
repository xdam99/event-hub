import { MongoClient, Db } from 'mongodb';

const mongoUri = "mongodb://root:1234@mongo:27017/eventhub?authSource=admin";
const mongoClient = new MongoClient(mongoUri);
let mongoDB: Db;

export async function connectMongo() {
  if (!mongoDB) {
    await mongoClient.connect();
    mongoDB = mongoClient.db("eventhub");
    console.log("✅ Connecté à MongoDB");
  }
  return mongoDB;
}

export { mongoClient, mongoDB };
