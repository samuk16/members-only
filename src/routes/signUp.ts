import { Router } from "express";

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
	res.render("pages/signUpForm");
});

export default signUpRouter;
