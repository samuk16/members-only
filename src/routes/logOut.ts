import { Router } from "express";

const logOutRouter = Router();

logOutRouter.post("/", (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

export default logOutRouter;
