import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import signUpRouter from "./routes/signUp";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import passport from "../src/config/passportjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool";
import type { Request, Response, NextFunction } from "express";
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
	console.log(req.session);
	next();
});

app.get("/", (req, res) => {
	res.render("pages/index");
});

app.use("/sign-up", signUpRouter);

interface CustomError extends Error {
	status?: number;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).render("pages/error", { error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
