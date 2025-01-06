import { Router } from "express";
import { getMember, postMember } from "../controllers/memberController";

const memberRouter = Router();

memberRouter.get("/", getMember);
memberRouter.post("/", ...postMember);
export default memberRouter;
