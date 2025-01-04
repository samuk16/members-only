import { pool } from "./pool";

export async function postUser(
	username: string,
	first_name: string,
	last_name: string,
	hash: string,
	salt: string,
	member: boolean,
	admin: boolean,
) {
	const { rows } = await pool.query(
		"INSERT INTO users (username, first_name, last_name, hash, salt, member, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[username, first_name, last_name, hash, salt, member, admin],
	);
	return rows;
}

export async function postMessage(user_id: number, text: string, added: Date) {
	const { rows } = await pool.query(
		"INSERT INTO records (user_id, text ,added) VALUES ($1, $2, $3)",
		[user_id, text, added],
	);
	return rows;
}
