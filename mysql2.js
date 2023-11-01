const { peek } = require('@laufire/utils/debug');
const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'nkg',
	password: 'password',
	database: 'elasticsearch',
});

// Connect to the database
connection.connect((err) => {
	if(err) {
		peek(`Error connecting to MySQL: ${ err.stack }`);
		return;
	}
	peek(`Connected to MySQL as id ${ connection.threadId }`);
});

const query = 'SELECT * FROM products';

connection.query(query, (err, results) => {
	if(err) {
		peek('Error executing the query:', err);
		return;
	}

	peek('Data from your_table:');
	peek(results);
});
