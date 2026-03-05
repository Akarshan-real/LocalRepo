import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import serverSecret from "@/env/server";
import { Types } from "mongoose";

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: "VERIFY" | "RESET", userId: string | Types.ObjectId }) => {
    try {
        const hashedToken = await bcryptjs.hash(String(userId), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 900000)
            },
                { runValidators: true });
        }
        else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 900000)
            },
                { runValidators: true });
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
            from: "gugugaga@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Email</title>
                    </head>
                    <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
                    
                        <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
                        <tr>
                            <td align="center">

                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;max-width:600px;width:100%;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

                                <tr>
                                <td align="center" style="font-size:26px;font-weight:bold;color:#333;">
                                    ${emailType === "VERIFY"
                                        ? "Verify Your Email"
                                        : "Reset Your Password"
                                    }
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:20px 0;color:#555;font-size:16px;text-align:center;">
                                    ${emailType === "VERIFY"
                                        ? "Thanks for signing up! Please confirm your email address by clicking the button below."
                                        : "We received a request to reset your password. Click the button below to proceed."
                                    }
                                </td>
                                </tr>

                                <tr>
                                <td align="center" style="padding:20px 0;">
                                    <a 
                                    href="${serverSecret.domain}/verifyemail?token=${hashedToken}" 
                                    style="background:#4f46e5;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold;display:inline-block;">
                                    ${emailType === "VERIFY"
                                        ? "Verify Email"
                                        : "Reset Password"
                                    }
                                    </a>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding-top:20px;color:#777;font-size:14px;text-align:center;">
                                    If the button doesn't work, copy and paste this link into your browser:
                                </td>
                                </tr>

                                <tr>
                                <td style="word-break:break-all;color:#4f46e5;font-size:14px;text-align:center;padding-top:10px;">
                                    ${serverSecret.domain}/verifyemail?token=${hashedToken}
                                </td>
                                </tr>

                                <tr>
                                <td style="padding-top:30px;font-size:13px;color:#999;text-align:center;">
                                    If you did not request this email, you can safely ignore it.
                                </td>
                                </tr>

                            </table>

                            </td>
                        </tr>
                        </table>

                    </body>
                    </html>
  `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("MAILER ERROR FULL:", error);
        throw error;
    };
};