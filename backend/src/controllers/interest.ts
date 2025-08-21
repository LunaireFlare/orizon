import { Response, Request } from "express";
import { Interest } from '../models/associations.js';
import { interestSchema } from "../schemas/interest.js";


const interestController = {

    /**
     * Retourne la liste des intérêts.
     * @param req
     * @param res 
     */
    async getAllInterests(req: Request, res: Response) {
        const interests = await Interest.findAll();
        res.json(interests);
    },

    /**
     * Création d'un intéret
     * @param req
     * @param res 
     */
    async createInterest(req: Request, res: Response) {
        const body = req.body;
        const { error, data } = interestSchema.safeParse(body);
        if (error) {
            return res.status(400).json({ error: error.message });
        };
        
        const { name } = data;
        const userExists = await Interest.findOne({ where: { name: name } });
        
        if (userExists !== null) {
            return res.status(400).json({ error: 'Interest already exists.' });
        };
        
        const createdInterest = await Interest.create({ name });
        
        res.status(201).json(createdInterest);
    },

    /**
     * Suppression d'un intérêt.
     * @param req
     * @param res 
     */
    async deleteInterest(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const interest = await Interest.findByPk(id);

        if (!interest) {
            return res.status(404).json({ error: 'Interest not found.' });
        }

        await interest.destroy();

        res.status(204).end();
    }
}

export { interestController }