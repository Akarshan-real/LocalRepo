import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import serverSecret from "@/env/server";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = await req.cookies.get("token")?.value || "";

        const decodedToken: any = await jwt.verify(token, serverSecret.secretToken);

        return decodedToken.id
    } catch (error: any) {
        throw new Error(error);
    }
};