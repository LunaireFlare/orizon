import { Request, Response, NextFunction } from "express";

const exampleController = {
    async index(_req: Request, res: Response) {
        // TODO: récupérer et renvoyer
        res.json([]);
    },

    async store(req: Request, res: Response) {
        // TODO: création
        res.status(201).json({});
    },

    async show(req: Request, res: Response, next: NextFunction) {
        // TODO: récupération
        res.json({});
    },

    async update(req: Request, res: Response, next: NextFunction) {
        // TODO: mise à jour
        res.json({});
    },

    async destroy(req: Request, res: Response, next: NextFunction) {
        // TODO: suppression
        res.status(204).end();
    },
};

export { exampleController };
