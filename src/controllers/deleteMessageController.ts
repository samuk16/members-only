import type { Request, Response } from "express";
import { deleteMessage } from "../db/queries";
export async function deleteMessageF(req: Request, res: Response) {
	await deleteMessage(Number(req.params.id));
	res.redirect("/");
}
