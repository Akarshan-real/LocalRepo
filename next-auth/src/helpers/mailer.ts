import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import serverSecret from "@/env/server";
import { Types } from "mongoose";

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: "VERIFY" | "RESET", userId: string | Types.ObjectId}) => {
    try {
        const hashedToken = await bcryptjs.hash(String(userId), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 900000
            });
        }
        else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 900000
            });
        };

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: Number(serverSecret.NODEMAILER_PORT),
            auth: {
                user: serverSecret.NODEMAILER_USER,
                pass: serverSecret.NODEMAILER_PASS
            }
        });

        // const transport = nodemailer.createTransport(
        //     MailtrapTransport({
        //         token: TOKEN,
        //     })
        // ); API OPTION

        const mailOptions = {
            from: 'home.shnauli@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${serverSecret.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${serverSecret.domain}/verifyemail?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("MAILER ERROR FULL:", error);
        throw error;
    };
};