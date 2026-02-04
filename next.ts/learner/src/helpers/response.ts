import z from "zod";

export const statusNumberSchema = z
    .number()
    .int()
    .min(100, 'Status code must be 3 digits')
    .max(599, "Status code must be 3 digits");

export const messageSchema = z
    .string()
    .trim()
    .min(1, "Message cannot be empty");

export const Response_ =
    (
        success: boolean,
        message: z.infer<typeof messageSchema>,
        status: z.infer<typeof statusNumberSchema>,
        data?: unknown
    ) => {
        messageSchema.parse(message);
        statusNumberSchema.parse(status);

        return Response.json({
            success: success,
            message: message,
            data : data
        }, { status: status })
    };