import { Router } from "express";
import { userController } from "../controllers/user.js";
const userRouter = Router();

userRouter.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);

userRouter.route('/users/:id')
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export { userRouter}