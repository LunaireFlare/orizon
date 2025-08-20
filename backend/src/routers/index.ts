import { Router } from "express";
const mainRouter = Router();

import { userRouter } from "./user.js";
import { authRouter } from "./auth.js";

// route de test
mainRouter.get("/", (_req, res) => {
    res.send("Welcome to the backend server!");
});

mainRouter.use(userRouter);
mainRouter.use(authRouter);

export { mainRouter };
