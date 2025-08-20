import { Router } from 'express';
const router = Router();

import { userRouter } from './user.js';

router.get('/', (_req, res) => {
    res.send('Welcome to the backend server!');
});

router.use(userRouter);

export { router }