import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

if(!process.env.MONGO_URI){
    throw new err("Please provide MONGO_URI in .env file")
}

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
    } catch(err){
        console.log("Database connection failed");
        process.exit(1);
    }
}