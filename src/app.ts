import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import signUpRouter from "./routes/signUp";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import passport from "../src/config/passportjs";
import session from "express-session";
import type { Session } from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool";
import type { Request, Response, NextFunction } from "express";
import logInRouter from "./routes/logIn";
import logOutRouter from "./routes/logOut";
import messageRouter from "./routes/message";
import { isAuth } from "./middlewares/auth";
const app = express();
dotenv.config();

const pgSession = connectPgSimple(session);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET || "secret",
		resave: false,
		saveUninitialized: false,
		store: new pgSession({ pool: pool, tableName: "sessions" }),
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
	}),
);
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
interface CustomSession extends Session {
	passport: {
		user: number;
	};
}

app.use((req, res, next) => {
	console.log(req.session);
	console.log((req.session as CustomSession).passport);
	next();
});

app.get("/", (req, res) => {
	res.render("pages/index", { user: req.user });
});

app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/log-out", logOutRouter);
app.get("/protected-route", isAuth, (req, res) => {
	if (req.isAuthenticated()) {
		res.render("pages/test");
	} else {
		res.render("pages/test2");
	}
});
app.use("/create-message", messageRouter);

interface CustomError extends Error {
	status?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	res
		.status(err.status || 500)
		.render("pages/error", { error: err.message, status: err.status || 500 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
