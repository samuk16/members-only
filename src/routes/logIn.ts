import { Router } from "express";
import { getLogin, postLogin } from "../controllers/loginController";
import passport from "../config/passportjs";
const logInRouter = Router();

logInRouter.get("/", getLogin);
logInRouter.post(
	"/",
	...postLogin,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/log-in",
	}),
);
export default logInRouter;
