import { Router } from "express";
import { getMessage, postMessageF } from "../controllers/messageController";
import { isAuth } from "../middlewares/auth";
const messageRouter = Router();

messageRouter.get("/", isAuth, getMessage);
messageRouter.post("/", isAuth, ...postMessageF);

export default messageRouter;
