import mongoose from "mongoose";
import serverSecret from "@/env/server";

export const dbConnect =  async () => {
    const checker = mongoose.connection.readyState;

    if (checker === 1 || checker === 2) {
        console.log(`${checker === 1 ? "DB already connected" : "DB connecting"}`);
        return;
    };

    try {
        await mongoose.connect(serverSecret.mongoDbUri);

        const connection = mongoose.connection;

        connection.on("connected",() => {
            console.log("MongoDB connected");
        });
        connection.on("error",(error) => {
            console.log("MongoDB connection error :: ",error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong in db connection :: ",error);
        process.exit();
    }
}