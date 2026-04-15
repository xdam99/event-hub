import mongoose from "mongoose";

export async function initializeMongoose() : Promise<void> {
    const mongoUri = "mongodb://mongo:27017/analytics"

    if(!mongoUri) {
        throw new Error("MONGO_URI n'est pas défini dans les variables d'env")
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB connected successfully");
        
    } catch (error) {
        console.log("Erreur lors de la connexion MongoDB: ", error)
    }
}