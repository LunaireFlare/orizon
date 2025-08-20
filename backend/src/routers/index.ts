import { Router } from 'express';
const mainRouter = Router();

import { userRouter } from './user.js';

mainRouter.get('/', (_req, res) => {
    res.send('Welcome to the backend server!');
});

mainRouter.use(userRouter);

export { mainRouter }