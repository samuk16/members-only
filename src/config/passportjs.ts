import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { pool } from "../db/pool";
interface CustomUser extends Express.User {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	hash: string;
	salt: string;
	member: boolean;
	admin: boolean;
}
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query(
				"SELECT * FROM users WHERE username = $1",
				[username],
			);
			const user = rows[0] as CustomUser;
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}

			const match = await bcrypt.compare(password, user.hash);

			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	const customUser = user as CustomUser;
	done(null, customUser.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		const user = rows[0] as CustomUser;

		done(null, user);
	} catch (err) {
		done(err);
	}
});

export default passport;
