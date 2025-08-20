import z from "zod";

const sixtyYearsAgo = (): Date => {
            const today = new Date();
            return new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
        };

export const userSchema = z.object({
            lastname: z.string().min(1).max(255),
            firstname: z.string().min(1).max(255),
            email: z.email(),
            password: z.string().min(8).max(255),
            zip_code: z.string().length(5).regex(/^\d{5}$/),
            city: z.string().min(1).max(255),
            date_of_birth: z.preprocess(
                (val) => (val ? new Date(val as string) : val),
                z.date().max(sixtyYearsAgo(), "Vous devez avoir au moins 60 ans")
            ),
            role: z.string().default("user"),
            photo: z.string().nullable().default(null),
            description: z.string().min(1).max(255),
            status: z.enum(["en_attente", "valide", "bloqué", "désactivé"]).default("en_attente")
        });