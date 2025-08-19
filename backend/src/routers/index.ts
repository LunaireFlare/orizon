import { Router } from 'express';
const router = Router();

import { userRouter } from './user.js';

router.use(userRouter);

export { router }