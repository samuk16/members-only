import type { Request, Response } from "express";
import { validatorSignUpForm } from "../validators/signUpValidator";
import { validationResult } from "express-validator";
export async function getForm(req: Request, res: Response) {
	res.render("pages/signUpForm");
}

export const postForm = [
	validatorSignUpForm,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.render("pages/signUpForm", { errors: errors.array() });
		}
		const { firstName, lastName, username, password } = req.body;
		console.log({ firstName, lastName, username, password });
		res.redirect("/");
	},
];
