import { Router } from "express";
import { userController } from "../controllers/user.js";
const userRouter = Router();

userRouter.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createUser)



export { userRouter}