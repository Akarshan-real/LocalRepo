import { dbConnect } from "@/app/dbConnection/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        dbConnect();
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        };

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verify email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    };
};