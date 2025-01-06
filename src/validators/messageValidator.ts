import { body } from "express-validator";

export const validatorMessageForm = [
	body("title")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Title must be at least 2 characters long.")
		.isLength({ max: 50 })
		.withMessage("Title must be at most 50 characters long."),
	body("message")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("First name must be at least 2 characters long.")
		.isLength({ max: 600 })
		.withMessage("First name must be at most 600 characters long."),
];
