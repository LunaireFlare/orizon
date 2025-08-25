import { Router } from 'express';
import { interestController } from '../controllers/interest.js';
import { authMiddleware } from '../middlewares/auth.js';
const interestRouter = Router();

interestRouter.route('/interests')
    .get(authMiddleware, interestController.getAllInterests)
    .post(authMiddleware, interestController.createInterest);

interestRouter.route('/interests/:id')
    .delete(authMiddleware, interestController.deleteInterest);

export { interestRouter}