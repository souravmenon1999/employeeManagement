import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();




async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to MongoDB database");
    } catch (error) {
        console.error("Failed to connect with MongoDB:", error.message);
        throw new Error("connectDB failed: " + error.message);
    }
}

export default connectDB;
