import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import z from "zod";
import { usernameValidation } from "@/schemas/signUpSchema.schema";

export const UserNameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    if (request.method !== 'GET') {
        return Response.json({
            success: false,
            message: 'Only GET method allowed'
        }, { status: 405 });
    };
    //Not needed tho

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        console.log('searchParams : ', searchParams);

        const queryParam = {
            username: searchParams.get("username")
        };
        console.log(queryParam);
        
        // validate with zod
        const results = UserNameQuerySchema.safeParse(queryParam);
        console.log('results : ', results);

        if (!results.success) {
            const usernameErrors = results.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query params',
            }, { status: 400 });
        };

        const { username } = results.data;
        console.log('Username :', username);

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });
        console.log('existingVerifiedUser :', existingVerifiedUser);

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 409 });
        };

        return Response.json({
            success: true,
            message: "Username is unique"
        }, { status: 200 });
    }
    catch (error) {
        console.log("Error checking username ", error);
        return Response.json({
            success: false,
            message: 'Error checking username'
        }, { status: 500 });
    }
}
