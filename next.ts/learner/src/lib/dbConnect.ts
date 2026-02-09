import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number
};

const connection : ConnectionObject = {};
// const connection : { isConnected ?: number} = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to DataBase');
        return;
    };

    try {
        const db = await mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost:27017/')  as string , {});

        // console.log(db);
        
        connection.isConnected = db.connections[0].readyState;

        // console.log(db.connections);
        
        console.log('DB connected successfully ',connection.isConnected);
    }
    catch (error) {
        console.log('Database connection failed ', error);
        process.exit(1);    
    };
};

export default dbConnect;
