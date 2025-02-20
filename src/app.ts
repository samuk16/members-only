import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import signUpRouter from "./routes/signUp";
import passport from "../src/config/passportjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool";
import type { Request, Response, NextFunction } from "express";
import logInRouter from "./routes/logIn";
import logOutRouter from "./routes/logOut";
import messageRouter from "./routes/message";
import indexRouter from "./routes";
import profileRouter from "./routes/profile";
import memberRouter from "./routes/member";
import { SESSION_SECRET, PORT } from "../src/config/config";
import adminRouter from "./routes/admin";
import methodOverride from "method-override";
import { deleteMessageF } from "./controllers/deleteMessageController";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const pgSession = connectPgSimple(session);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
	session({
		secret: SESSION_SECRET || "secret",
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

app.get("/", indexRouter);

app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/log-out", logOutRouter);
app.use("/create-message", messageRouter);
app.use("/profile", profileRouter);
app.use("/member", memberRouter);
app.use("/admin", adminRouter);
app.delete("/message/:id", deleteMessageF);
interface CustomError extends Error {
	status?: number;
}

app.get("*", (req: Request, res: Response, next: NextFunction) => {
	const error: CustomError = new Error("Page not found!");
	error.status = 404;
	next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	res
		.status(err.status || 500)
		.render("pages/error", { error: err.message, status: err.status || 500 });
});

app.listen(PORT || 8000, () => {
	console.log(`Server running on port ${PORT}`);
});
