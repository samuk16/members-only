import { Router } from "express";
import { getForm, postForm } from "../controllers/signUpController";

const signUpRouter = Router();

signUpRouter.get("/", getForm);

signUpRouter.post("/", ...postForm);

export default signUpRouter;
