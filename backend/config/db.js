import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://henilhirpara8_db_user:3Jv9bLBFfqt7kwWd@cluster0.xnaewg4.mongodb.net/food-del?retryWrites=true&w=majority"
        );

        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed:", error.message);
    }
};