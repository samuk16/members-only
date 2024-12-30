import { Client } from "pg";
import { argv } from "node:process";

// const date = new Date();

const SQL3 = `
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name_tag VARCHAR (25) UNIQUE
);
`;
const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name_author VARCHAR (255) UNIQUE
);
`;
const SQL2 = `
CREATE TABLE IF NOT EXISTS manhwas (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255) UNIQUE,
  description VARCHAR(600),
  caps INTEGER,
  url_img VARCHAR(255),
  author_id INTEGER REFERENCES authors,
  password VARCHAR(255)
);
`;
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
text TEXT,
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
const SQL4 = `
CREATE TABLE IF NOT EXISTS manhwas_tags (
   manhwa_id INTEGER REFERENCES manhwas(id) ON DELETE CASCADE,
   tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
   PRIMARY KEY (manhwa_id, tag_id)
);
`;

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
