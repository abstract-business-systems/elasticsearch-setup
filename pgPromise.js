require('dotenv').config();
const { peek } = require('@laufire/utils/debug');
const { Client } = require('pg');

const main = async () => {
	const client = new Client({
		host: 'localhost',
		port: process.env.POSTGRES_PORT,
		database: 'elasticsearch',
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
	});

	await client.connect();
	const query = 'SELECT * FROM products';

	client.query(query, (err, res) => {
		if(err)
			peek(err);

		else {
			peek('Data from your_table:');
			peek(res.rows);
		}

		client.end();
	});
};

main();
