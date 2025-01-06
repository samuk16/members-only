import type { Request, Response } from "express";
import { getUser, getUserMessages } from "../db/queries";
import type { CustomSession } from "../types/session";

export async function getProfile(req: Request, res: Response) {
	const userMessages = await getUserMessages(
		(req.session as CustomSession).passport.user,
	);
	res.render("pages/profile", { messages: userMessages });
}
