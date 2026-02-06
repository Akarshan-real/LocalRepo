import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { Response_ } from "@/helpers/response";
import mongoose from "mongoose";
import UserModel from "@/model/User.model";

export const GET = async (request: Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response_(false, "Not authenticated", 401);
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        if (!user || user.length === 0) {
            return Response_(false, "User not found", 401);
        };

        return Response.json({
            success: true,
            messages: user[0].messages
        }, { status: 200 });
    }
    catch (error) {
        return Response_(false,"Error in fetching messages",500);
    }
}