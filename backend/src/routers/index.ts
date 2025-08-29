import { Router } from "express";
const mainRouter = Router();

import { userRouter } from "./user.js";
import { interestRouter } from "./interest.js";
import { authRouter } from "./auth.js";
import { eventRouter } from "./event.js";
import { adminRouter } from "./admin.js";

// route de test
mainRouter.get("/", (_req, res) => {
  res.send("Welcome to the backend server!");
});

mainRouter.use(userRouter);
mainRouter.use(authRouter);
mainRouter.use(interestRouter);
mainRouter.use(eventRouter);
mainRouter.use(adminRouter);

export { mainRouter };
