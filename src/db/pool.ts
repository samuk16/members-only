import pkg from "pg";
import { DB_URL } from "../config/config";
const { Pool } = pkg;
const dburl = DB_URL;

export const pool = new Pool({
	connectionString: dburl,
});
