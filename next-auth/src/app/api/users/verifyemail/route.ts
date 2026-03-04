import { dbConnect } from "@/app/dbConnection/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        dbConnect();

        const reqBody = await req.json();
        const { token } = reqBody._id;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({
                error: "Invalid token , user not found"
            }, { status: 400 });
        };

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified",
            success: true
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
}