import z from "zod";
import { passwordValidation, usernameValidation, emailValidation } from "./signUp.schema";

export const signInSchema = z.object({
    identifier: z.
        string().
        min(2, "Username or Email is required").
        refine(
            (value) => (
                emailValidation.safeParse(value).success || usernameValidation.safeParse(value).success
            ), { message: "Enter a valid email or username" }
        )
    ,
    password: passwordValidation,
})