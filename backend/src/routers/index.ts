import { Router } from 'express';
const mainRouter = Router();

import { userRouter } from './user.js';
import { eventRouter } from './event.js';

// route de test
mainRouter.get('/', (_req, res) => {
    res.send('Welcome to the backend server!');
});

mainRouter.use(userRouter);
mainRouter.use(eventRouter);

export { mainRouter }