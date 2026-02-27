import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Response_ } from "@/helpers/response";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username , verifyCode } = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response_(false, "User not found", 500);
        }

        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return Response_(true, "Account verified successfully", 200)
        }
        else if (!isCodeNotExpired) {
            return Response_(false, "Verification code has expired . Please sign up to get a new code", 400);
        }
        else {
            return Response_(false, "Verification code is incorrect", 400);
        }
    }
    catch (error) {
        console.error("Error verifying user: ", error);
        return Response_(false, "Error verifying user", 500);
    }
}