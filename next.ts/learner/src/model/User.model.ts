import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt: Date
};

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified : boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
};

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim : true
    },
    verifyCode : {
        type: String,
        required: [true, 'Verify Code is required'],
        trim : true
    },
    verifyCodeExpiry : {
        type: Date,
        required: [true, 'Expiry code is required']
    },
    isVerified : {
        type: Boolean,
        default : false
    },
    isAcceptingMessage : {
        type: Boolean,
        default : false
    },
    messages : [MessageSchema]
});

const UserModel = mongoose.models.Users || mongoose.model<User>("Users",UserSchema);

export default UserModel;
