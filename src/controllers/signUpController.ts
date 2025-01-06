import type { Request, Response, NextFunction } from "express";
import { validatorSignUpForm } from "../validators/signUpValidator";
import { validationResult } from "express-validator";
import { postUser } from "../db/queries";
import bcrypt from "bcryptjs";
export async function getForm(req: Request, res: Response) {
	res.render("pages/signUpForm");
}

export const postForm = [
	validatorSignUpForm,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.render("pages/signUpForm", { errors: errors.array() });
			}
			const { firstName, lastName, username, password } = req.body;
			console.log({ firstName, lastName, username, password });

			bcrypt.genSalt(10, (err, salt) => {
				if (err) return next(err);
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) return next(err);
					await postUser(
						username,
						firstName,
						lastName,
						hash,
						salt,
						false,
						false,
					);
				});
			});

			res.redirect("/log-in");
		} catch (err) {
			console.log(err);
			return next(err);
		}
	},
];
