import express from "express";
import { adminController } from "../controllers/admin.js";

const adminRouter = express.Router(); // <== ici

// Route pour mettre à jour le statut d'un utilisateur
adminRouter.put("/users/:id/status", adminController.updateUserStatus);

// Route pour mettre à jour le statut d'un événement
adminRouter.put("/events/:id/status", adminController.updateEventStatus);

export { adminRouter };
