import type { Request, Response, NextFunction } from "express";
import { validatorMemberForm } from "../validators/memberValidator";
import type { CustomSession } from "../types/session";
import { validationResult } from "express-validator";
import { becomeAdmin } from "../db/queries";
import { ADMIN_CODE } from "../config/config";

export async function getAdmin(req: Request, res: Response) {
	res.render("pages/adminForm");
}

export const postAdmin = [
	validatorMemberForm,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.render("pages/adminForm", { errors: errors.array() });
			}
			const code = req.body.code;
			if (code === ADMIN_CODE) {
				await becomeAdmin((req.session as CustomSession).passport.user);
				res.redirect("/");
			} else {
				return res.render("pages/adminForm", {
					errors: [{ msg: "Invalid code" }],
				});
			}
		} catch (err) {
			next(err);
		}
	},
];
