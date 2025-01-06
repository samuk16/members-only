import { Router } from "express";
import { getProfile } from "../controllers/profileController";
import { isAuth } from "../middlewares/auth";

const profileRouter = Router();

profileRouter.get("/", isAuth, getProfile);

export default profileRouter;
