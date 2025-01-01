import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { pool } from "../db/pool";
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query(
				"SELECT * FROM users WHERE username = $1",
				[username],
			);
			const user = rows[0];

			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			// if (user.password !== password) {
			// 	return done(null, false, { message: "Incorrect password" });
			// }
			const match = await bcrypt.compare(password, user.password);
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
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		const user = rows[0];

		done(null, user);
	} catch (err) {
		done(err);
	}
});

export default passport;
