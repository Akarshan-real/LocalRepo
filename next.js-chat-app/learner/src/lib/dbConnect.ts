import mongoose from "mongoose";
import UserModel from "@/model/User.model";

type ConnectionObject = {
    isConnected?: number
};

const connection: ConnectionObject = {};
// const connection : { isConnected ?: number} = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log(
            'DB already connected ', connection.isConnected,
            " | ",
            "DB :", mongoose.connection.name,
            " | ",
            "Collection name:", UserModel.collection.name);
        return;
    };

    try {
        const db = await mongoose.connect((process.env.MONGODB_URI) as string, {
            dbName: "mystrymsg",
        });

        connection.isConnected = db.connections[0].readyState;

        console.log(
            'DB connected successfully ', connection.isConnected,
            " | ",
            "DB :", mongoose.connection.name,
            " | ",
            "Collection name:", UserModel.collection.name);
    }
    catch (error) {
        console.log('Database connection failed ', error);
        process.exit(1);
    };
};

export default dbConnect;
