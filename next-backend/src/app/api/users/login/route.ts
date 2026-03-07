import { dbConnect } from "@/app/dbConnection/dbConfig";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import secretServer from "@/env/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await dbConnect();
        const reqBody = await req.json();
        const { email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "User does not exist",
                success: false
            }, { status: 404 });
        };

        const passwordCheck = await bcryptjs.compare(password, user.password);

        if (!passwordCheck) {
            return NextResponse.json({
                message: "Check your password",
                success: false,
                user
            }, { status: 401 });
        };

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = await jwt.sign(tokenPayload, secretServer.secretToken, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "User log in successfully",
            success: true,
            user
        }, { status: 200 });

        response.cookies.set("token",token,{
            httpOnly : true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success : false
        }, { status: 500 });
    };
};