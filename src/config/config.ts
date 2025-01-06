import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.CONNECTION_DB_URL;
export const MEMBER_CODE = process.env.MEMBER_CODE;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const ADMIN_CODE = process.env.ADMIN_CODE;
