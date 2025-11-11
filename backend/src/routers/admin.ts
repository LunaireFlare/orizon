import express from "express";
import { adminController } from "../controllers/admin.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { authMiddleware } from "../middlewares/auth.js";
import { eventController } from "../controllers/event.js";
import { userController } from "../controllers/user.js";

const adminRouter = express.Router();

adminRouter.get(
  "/events",
  authMiddleware,
  authorizeRoles(["admin", "moderator"]),
  eventController.getAllEvents
);

adminRouter.get(
  "/users",
  authMiddleware,
  authorizeRoles(["admin", "moderator"]),
  userController.getAllUsers
);

// Route pour mettre à jour le statut d'un utilisateur
adminRouter.patch(
  "/users/:id/status",
  authMiddleware,
  authorizeRoles(["admin", "moderator"]),
  adminController.updateUserStatus
);

// Route pour mettre à jour le statut d'un événement
adminRouter.patch(
  "/events/:id/status",
  authMiddleware,
  authorizeRoles(["admin", "moderator"]),
  adminController.updateEventStatus
);

export { adminRouter };
