import type { Request, Response, NextFunction } from "express";
import { validatorMessageForm } from "../validators/messageValidator";
import { validationResult } from "express-validator";
import { postMessage } from "../db/queries";
import type { CustomSession } from "../types/session";

export async function getMessage(req: Request, res: Response) {
	res.render("pages/messageForm");
}

export const postMessageF = [
	validatorMessageForm,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.render("pages/messageForm", { errors: errors.array() });
			}
			await postMessage(
				(req.session as CustomSession).passport.user,
				req.body.title,
				req.body.message,
				new Date(),
			);
			res.redirect("/");
		} catch (err) {
			next(err);
		}
	},
];
