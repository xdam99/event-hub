"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || "mongodb://root:1234@mongo:27017/admin";
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connecté à MongoDB");
    }
    catch (error) {
        console.error("❌ Erreur connexion MongoDB :", error);
        process.exit(1);
    }
};
exports.connectMongo = connectMongo;
