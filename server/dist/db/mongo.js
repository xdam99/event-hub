"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDB = exports.mongoClient = void 0;
exports.connectMongo = connectMongo;
const mongodb_1 = require("mongodb");
const mongoUri = "mongodb://root:1234@mongo:27017/eventhub?authSource=admin";
const mongoClient = new mongodb_1.MongoClient(mongoUri);
exports.mongoClient = mongoClient;
let mongoDB;
async function connectMongo() {
    if (!mongoDB) {
        await mongoClient.connect();
        exports.mongoDB = mongoDB = mongoClient.db("eventhub");
        console.log("✅ Connecté à MongoDB");
    }
    return mongoDB;
}
