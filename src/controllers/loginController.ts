import type { Request, Response, NextFunction } from "express";
import { validatorLoginForm } from "../validators/logIngValidator";
import { validationResult } from "express-validator";

export async function getLogin(req: Request, res: Response) {
	res.render("pages/loginForm");
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
