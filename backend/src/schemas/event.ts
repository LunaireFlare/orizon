import z from 'zod';

export const eventSchema = z.object({
            name: z.string().min(1).max(255),
            start_date: z.coerce.date().refine((date) => date > new Date(), {
                message: 'La date de début doit être dans le futur',
            }),
            end_date: z.coerce.date(),
            description: z.string().min(1).max(255),
            address: z.string().min(1).max(255),
            zip_code: z.string().length(5).regex(/^\d{5}$/),
            city: z.string().min(1).max(255),
            status: z.enum(['en_attente', 'valide', 'bloqué']).default('en_attente')
        })
        .refine((data) => data.end_date > data.start_date, {
            message: 'La date de fin doit se situer après la date de début',
            path: ['endDate'],
        });