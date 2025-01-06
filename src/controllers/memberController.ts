import type { Request, Response, NextFunction } from "express";
import { validatorMemberForm } from "../validators/memberValidator";
import { validationResult } from "express-validator";
import { becomeMember } from "../db/queries";
import type { CustomSession } from "../types/session";
import { MEMBER_CODE } from "../config/config";
export async function getMember(req: Request, res: Response) {
	res.render("pages/memberForm");
}

export const postMember = [
	validatorMemberForm,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.render("pages/memberForm", { errors: errors.array() });
			}
			const code = req.body.code;
			if (code === MEMBER_CODE) {
				await becomeMember((req.session as CustomSession).passport.user);
				res.redirect("/");
			} else {
				return res.render("pages/memberForm", {
					errors: [{ msg: "Invalid code" }],
				});
			}
		} catch (err) {
			next(err);
		}
	},
];
