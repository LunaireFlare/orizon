import { Router } from "express";
import { userController } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter
  .route("/users")
  .get( userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/users/:id")
  .get(userController.getOneUser)
  .put(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser)
  .post(userController.addOneInterestToUser);

export { userRouter };
