require('dotenv').config({path: __dirname + '/.env'})
const pg = require('pg');
const config = {
  host: process.env['HOST'],
  user: process.env['USERNAME'],
  password: process.env['PASS'],
  database: process.env['DB'],
  port: 5432,
  ssl: false
};

const client = new pg.Client(config);

client.connect(err => {
  if (err) throw err;
  else { 
    console.log('we\'re in business');
  }
});