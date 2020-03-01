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
    queryDatabase();
  }
});

function queryDatabase() {
  const query = `
      DROP TABLE IF EXISTS inventory;
      CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
      INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
      INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
      INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
  `;

  client
      .query(query)
      .then(() => {
          console.log('Table created successfully!');
          client.end(console.log('Closed client connection'));
      })
      .catch(err => console.log(err))
      .then(() => {
          console.log('Finished execution, exiting now');
          process.exit();
      });
}