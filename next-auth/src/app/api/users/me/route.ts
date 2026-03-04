import { dbConnect } from "@/app/dbConnection/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const GET = async (req: NextRequest) => {
    try {
        dbConnect();
        const userId = await getDataFromToken(req);

        const user = await User.findOne({ _id: userId }, { password: 0 });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 404 });
        };

        return NextResponse.json({
            message: "User found",
            success: true,
            data: user
        }, { status: 200 });
    }
    catch (error:any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}