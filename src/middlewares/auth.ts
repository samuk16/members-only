import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "../types/err";
export function isAuth(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		next();
	} else {
		const err: CustomError = new Error("Not authenticated");
		err.status = 401;
		next(err);
	}
}
interface User {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	hash: string;
	salt: string;
	member: boolean;
	admin: boolean;
}
export function isAdmin(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated() && (req.user as User).admin) {
		next();
	} else {
		const err: CustomError = new Error("Forbidden");
		err.status = 403;
		next(err);
	}
}
