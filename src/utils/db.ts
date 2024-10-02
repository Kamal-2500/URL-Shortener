import mongoose from "mongoose";

export const dbConnect = async () => {
    const dbUri = `mongodb://localhost:27017/shortenUrl`;
    await mongoose.connect(dbUri);
    console.log('DB connected');
}