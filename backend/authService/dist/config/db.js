import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authService';
export async function connect() {
    try {
        mongoose.connect(MONGO_URI);
        console.log("Successfully connected to database");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
