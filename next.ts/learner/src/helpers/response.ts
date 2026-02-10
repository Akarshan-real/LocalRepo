import z from "zod";

export const statusNumberSchema = z
    .number()
    .int()
    .min(100, 'Status code must be a valid HTTP status')
    .max(599, 'Status code must be a valid HTTP status');

export const messageSchema = z
    .string()
    .trim()
    .min(1, "Message cannot be empty");

export const responseSchema = z.object({
    success: z.boolean(),
    message: messageSchema,
    status: statusNumberSchema,
    data: z.unknown().optional(),
})

export const Response_ = (
        success: boolean,
        message: string /* || z.infer<typeof messageSchema> */,
        status: number /* || z.infer<typeof statusNumberSchema> */,
        data?: unknown
    ) => {
        responseSchema.parse({ success, message, status, data });

        return Response.json({
            success: success,
            message: message,
            data: data
        }, { status: status })
    };