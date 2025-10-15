import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://root:1234@mongo:27017/admin";

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur connexion MongoDB :", error);
    process.exit(1);
  }
};
