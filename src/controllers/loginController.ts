import type { Request, Response, NextFunction } from "express";
import { validatorLoginForm } from "../validators/logIngValidator";
import { validationResult } from "express-validator";
import type { CustomSession } from "../types/session";

export async function getLogin(req: Request, res: Response) {
	const errors = (req.session as CustomSession).messages;
	(req.session as CustomSession).messages = [];
	res.render("pages/loginForm", { errors });
}

export const postLogin = [
	validatorLoginForm,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.render("pages/loginForm", { errors: errors.array() });
			}
			next();
		} catch (err) {
			next(err);
		}
	},
];
