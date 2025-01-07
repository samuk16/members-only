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
		failureMessage: "Invalid username or password. Please try again.",
		failureRedirect: "/log-in",
	}),
);
export default logInRouter;
