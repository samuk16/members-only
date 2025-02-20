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

export async function postMessage(
	user_id: number,
	title: string,
	text: string,
	added: Date,
) {
	const { rows } = await pool.query(
		"INSERT INTO records (user_id,title, text ,added) VALUES ($1, $2, $3,$4)",
		[user_id, title, text, added],
	);
	return rows;
}

export async function getMessages() {
	const { rows } = await pool.query(
		"SELECT users.username,users.admin,users.member,records.* FROM records JOIN users ON records.user_id = users.id",
	);
	return rows;
}

export async function getUserMessages(id: number) {
	const { rows } = await pool.query(
		"SELECT * FROM records WHERE user_id = $1",
		[id],
	);
	return rows;
}

export async function getUser(id: number) {
	const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	return rows;
}

export async function becomeMember(id: number) {
	const { rows } = await pool.query(
		"UPDATE users SET member = true WHERE id = $1",
		[id],
	);
	return rows;
}
export async function becomeAdmin(id: number) {
	const { rows } = await pool.query(
		"UPDATE users SET admin = true WHERE id = $1",
		[id],
	);
	return rows;
}

export async function deleteMessage(id: number) {
	const { rows } = await pool.query("DELETE FROM records WHERE id = $1", [id]);
	return rows;
}
