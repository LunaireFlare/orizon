import { Router } from "express";
import { userController } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter
    .route("/users")
    .get(authMiddleware, userController.getAllUsers)
    .post(userController.createUser);

userRouter
    .route("/users/:id")
    .get(authMiddleware, userController.getOneUser)
    .put(authMiddleware, userController.updateUser)
    .delete(authMiddleware, userController.deleteUser);

export { userRouter };
