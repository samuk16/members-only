import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import signUpRouter from "./routes/signUp";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import passport from "../src/config/passportjs";
import session from "express-session";
const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.get("/", (req, res) => {
	res.render("pages/index");
});

app.use("/sign-up", signUpRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
