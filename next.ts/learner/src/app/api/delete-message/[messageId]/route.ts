import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { Response_ } from "@/helpers/response";
import UserModel from "@/model/User.model";

export const DELETE = async (request: Request, { params }: { params: { messageId: string } }) => {
    const messageId = params.messageId;
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response_(false, "Not authenticated", 401);
    };

    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        );

        if (updateResult.modifiedCount === 0) {
            return Response_(false,"Message not found or already deleted",404);
        };

        return Response_(true,"Message Deleted",200);
    } catch (error) {
        console.log("Error in delete message route ",error);
        return Response_(false,"Error deleting message",500);
    };
}