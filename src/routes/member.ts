import { Router } from "express";
import { getMember, postMember } from "../controllers/memberController";
import { isAuth } from "../middlewares/auth";

const memberRouter = Router();

memberRouter.get("/", isAuth, getMember);
memberRouter.post("/", ...postMember);
export default memberRouter;
