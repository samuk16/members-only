import { body } from "express-validator";

export const validatorSignUpForm = [
	body("firstName")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("First name must be at least 2 characters long"),
	body("lastName")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Last name must be at least 2 characters long"),
	body("username")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Username must be at least 2 characters long"),
	body("password")
		.trim()
		.isLength({ min: 5 })
		.withMessage("Password must be at least 5 characters long"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			console.log(value, req.body.password);
			throw new Error("Passwords do not match");
		}
		if (value === req.body.password) {
			return value;
		}
	}),
];
