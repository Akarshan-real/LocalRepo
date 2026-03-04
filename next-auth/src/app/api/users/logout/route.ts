import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, { status: 200 });

        response.cookies.set("token","",{
            httpOnly : true,
            expires : new Date(0)
        });

        return response;
    }
    catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    };
};