import { body } from "express-validator";

export const validatorMemberForm = [
	body("code")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Code must be at least 2 characters long.")
		.isLength({ max: 10 })
		.withMessage("Code must be at most 50 characters long."),
];
