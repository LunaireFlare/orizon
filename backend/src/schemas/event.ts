import z from 'zod';

export const createEventSchema = z.object({
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

        export const updateEventSchema = z.object({
            name: z.string().min(1).max(255).optional(),
            start_date: z.coerce.date().optional().refine((date) => {
                if (!date) return true;
                return date > new Date();
            }, {
                message: 'La date de début doit être dans le futur',
            }),
            end_date: z.coerce.date().optional(),
            description: z.string().min(1).max(255).optional(),
            address: z.string().min(1).max(255).optional(),
            zip_code: z.string().length(5).regex(/^\d{5}$/).optional(),
            city: z.string().min(1).max(255).optional(),
            status: z.enum(['en_attente', 'valide', 'bloqué']).default('en_attente')
        })
        .refine((data) => {
            if (!data.start_date || !data.end_date) return true;
            return data.end_date > data.start_date;
        } , {
            message: 'La date de fin doit se situer après la date de début',
            path: ['endDate'],
        });