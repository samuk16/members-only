import { body } from "express-validator";

export const validatorMessageForm = [
	body("message")
		.trim()
		.escape()
		.isLength({ min: 2, max: 600 })
		.withMessage("Message must be at least 2 characters long"),
];
