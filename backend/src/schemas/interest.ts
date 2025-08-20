import z from "zod";


export const interestSchema = z.object({
            name: z.string().min(1).max(255),
    });