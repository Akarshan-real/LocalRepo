import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import { Response_ } from "@/helpers/response";


export const POST = async (request: Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response_(false, "Not authenticated", 401);
    }

    const userId = user._id;

    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response_(false, "Failed to update user status to accept message", 401);
        };

        return Response_(true, "Message acceptance status updated successfully", 200, updatedUser);

    } 
    catch (error) {
        return Response_(false, "Failed to update user status to accept messages", 500);
    }
}

export const GET = async (request: Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response_(false, "Not authenticated", 401);
    };

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if (!foundUser) {
            return Response_(false, "User not found", 404);
        }

        return Response.json({
            success: true,
            isAcceptingMessage: foundUser.isAcceptingMessage,
        }, { status: 200 });
    } 
    catch (error) {
        return Response_(false, "Error in getting message accepting status", 500);
    }
}
