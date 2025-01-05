import { Client } from "pg";
import { argv } from "node:process";

// const date = new Date();
const SQL2T = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255) UNIQUE,
  first_name VARCHAR (255) ,
  last_name VARCHAR (255) ,
  hash TEXT,
  salt TEXT,
  member BOOLEAN,
  admin BOOLEAN
);
`;

const SQL35 = `
CREATE TABLE IF NOT EXISTS records(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(50),
text TEXT,
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

const SQL3 = `
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,    
  sess JSON NOT NULL,               
  expire TIMESTAMP NOT NULL         
);`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: argv[2],
	});
	try {
		await client.connect();
		// await client.query(SQL3);
		// await client.query(SQL);
		// await client.query(SQL2);
		// await client.query(SQL4);
		// await client.query(insertQuery, [date]);
		// await client.query(insertQuery);
		// await client.query(insertQuery3);
		// await client.query(insertQuery2);
		console.log("done");
	} catch (err) {
		console.log(err);
	} finally {
		await client.end();
	}
}

main();
