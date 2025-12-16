import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB connection
const client = new MongoClient('mongodb://root:1234@mongo:27017/eventhub?authSource=admin');
let db;
client.connect().then(() => {
  db = client.db('eventhub');
  console.log('✅ Connecté à MongoDB !');
});

export { app, db };
