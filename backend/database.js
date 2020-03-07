require('dotenv').config({path: __dirname + '/.env'})
const pg = require('pg');
const port = 5432;

const config = {
  host: process.env['HOST'],
  user: process.env['USERNAME'],
  password: process.env['PASS'],
  database: process.env['DB'],
  port: port,
  ssl: false
};

const client = new pg.Client(config);

client.connect(err => {
  if (err) throw err;
  else { 
    console.log('We\'re in business.');
    console.log('Database running on port ' + port + '.');
  }
});

const addUser = (request, response) => {
  const body = request.body;

  const query = `
    INSERT INTO "Users" ("Username", "Password", "FirstName", "LastName", "Email", "PhoneNumber", "LastLoggedIn", "Timestamp")
    VALUES ($1, $2, $3, $4, $5, $6, NULL, NOW())
  `;
  
  client
    .query(query, [body.UserName, body.Password, body.FirstName, body.LastName, body.Email, body.PhoneNumber])
    .then(result => {
      console.log(result);
      response.json({'success': true, 'message': 'User has been inserted.'});
    })
    .catch(error => {
      console.log(error);
      response.json({'success': false, 'message': error.toString()});
    })
    .then(() => client.end());
};

module.exports = {
  addUser
};