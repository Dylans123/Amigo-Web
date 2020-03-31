require('dotenv').config({path: __dirname + '/.env'});

// Connect to the database
const pg = require('pg');
const port = 5432;

const config = {
	host: process.env['DB_HOST'],
	user: process.env['DB_USERNAME'],
	password: process.env['DB_PASS'],
	name: process.env['DB_NAME'],
	database: process.env['DB_DATABASE'],
	port: port,
};

const client = new pg.Client(config);

client.connect(error => {
	if (error) throw error;
	else {
		console.log('We\'re in business.');
		console.log('Database running on port ' + port + '.');
	}
});

module.exports = {
	client
};