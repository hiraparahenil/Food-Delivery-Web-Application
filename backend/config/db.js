import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
}