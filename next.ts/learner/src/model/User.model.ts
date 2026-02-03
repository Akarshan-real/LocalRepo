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
        default: Date.now()
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
        match: [/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm, 'Please use a valid email address']
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

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;
