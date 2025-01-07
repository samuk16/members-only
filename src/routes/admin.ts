import { Router } from "express";
import { getAdmin, postAdmin } from "../controllers/adminController";
import { isAuth } from "../middlewares/auth";

const adminRouter = Router();

adminRouter.get("/", isAuth, getAdmin);
adminRouter.post("/", ...postAdmin);
export default adminRouter;
