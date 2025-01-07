import { Router } from "express";
import { getAdmin, postAdmin } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/", getAdmin);
adminRouter.post("/", ...postAdmin);
export default adminRouter;
