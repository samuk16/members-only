import type { Request, Response } from "express";
import { getMessages } from "../db/queries";

export async function getIndex(req: Request, res: Response) {
	const messages = await getMessages();
	res.render("pages/index", { user: req.user, messages: messages });
}
