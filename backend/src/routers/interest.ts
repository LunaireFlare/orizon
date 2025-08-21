import { Router } from "express";
import { interestController } from "../controllers/interest.js";
const interestRouter = Router();

interestRouter.route('/interests')
    .get(interestController.getAllInterests)
    .post(interestController.createInterest);

interestRouter.route('/interests/:id')

    .delete(interestController.deleteInterest);

export { interestRouter}