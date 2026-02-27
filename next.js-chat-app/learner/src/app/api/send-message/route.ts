import { Response_ } from "@/helpers/response";
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User.model";

export const POST = async (request:Request) => {
    await dbConnect();

    const {username , content} = await request.json();

    try {
        const user = await UserModel.findOne({username});

        if (!user) {
            return Response_(false,"User not found",404);
        };

        if (!user.isAcceptingMessages) {
            return Response_(false,"User is not accepting the messages",403);
        };

        const newMessage = {content,createdAt:new Date()};
        user.messages.push(newMessage as Message);
        await user.save();

        return Response_(true,"Message sent successfully",200);
    } catch (error) {
        console.log(`Error adding messages: ${error}`);
        return Response_(false,"Internal server error",500);
    }
}