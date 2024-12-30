import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
const dburl = process.env.CONNECTION_DB_URL;
dotenv.config();

export const pool = new Pool({
	connectionString: dburl,
});
