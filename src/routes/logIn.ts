import { Router } from "express";
import { getLogin, postLogin } from "../controllers/loginController";
import passport from "../config/passportjs";
const logInRouter = Router();

logInRouter.get("/", getLogin);
logInRouter.post(
	"/",
	passport.authenticate("local", {
		successRedirect: "/protected-route",
		failureRedirect: "/",
	}),
);
export default logInRouter;
