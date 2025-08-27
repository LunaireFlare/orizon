import { Router } from "express";
import { userController } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const userRouter = Router();

userRouter
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/users/:id")
  .get(userController.getOneUser)
  .put(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser)
  .patch(
    authMiddleware,
    authorizeRoles(["modo", "admin"]),
    userController.updateStatus
  );

userRouter
  .route("/users/:id/interests")
  .post(authMiddleware, userController.addOneInterestToUser);

userRouter
  .route("/users/:id/interests/:interest_id")
  .delete(authMiddleware, userController.deleteOneInterestToUser);

export { userRouter };
