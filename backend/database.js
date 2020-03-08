require('dotenv').config({path: __dirname + '/.env'})
const pg = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const key = process.env['KEY'];
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

client.connect(error => {
  if (error) throw error;
  else { 
    console.log('We\'re in business.');
    console.log('Database running on port ' + port + '.');
  }
});

const signup = (request, response) => {
  const body = request.body;

  // Check to see if user exists already.
  var query = `
    SELECT * FROM "Users" WHERE "Username" = $1
  `;
  
  client
    .query(query, [body.Username])
    .then(result => {
      if (result.rows.length > 0) {
        response.status(409);
        response.json({'success': false, 'message': 'User already exists.'});
      }
      else {
        const password = bcrypt.hashSync(body.Password, saltRounds);
        
        // User does not exist, so add user.
        query = `
          INSERT INTO "Users" ("Username", "Password", "FirstName", "LastName", "Email", "PhoneNumber", "LastLoggedIn", "Timestamp")
          VALUES ($1, $2, $3, $4, $5, $6, NULL, NOW())
        `;

        client
          .query(query, [body.Username, password, body.FirstName, body.LastName, body.Email, body.PhoneNumber])
          .then(result => {
            response.status(201);
            response.json({'success': true, 'message': 'Sign up successful!'});
          })
          .catch(error => {
            response.json({'success': false, 'message': error.toString()});
          });
      }
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

const login = (request, response) => {
  const body = request.body;

  const query = `
    SELECT * FROM "Users" WHERE "Username" = $1
  `;
  
  client
    .query(query, [body.Username])
    .then(result => {
      if (result.rows.length > 0 && bcrypt.compareSync(body.Password, result.rows[0].Password)) {
        const payload = {Username: body.Username};
        const token = jwt.sign(payload, key, {expiresIn: "7d"});
        response.json({'success': true, 'message': 'Login successful!', 'token': token});
      }
      else {
        response.status(401);
        response.json({'success': false, 'message': 'Login in failed.'});
      }
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

validateUser = (request, response, next) => {
  jwt.verify(request.headers['x-access-token'], key, (error, decoded) => {
    if (error) {
      response.json({'status': 'Authorization failed.', 'message': error.toString()});
    }
    else {
      next();
    }
  });
}

const displayUserInfo = (request, response) => {
  const body = request.body;
  response.send(body);

  const query = `
    SELECT * FROM "Users" WHERE "UserID" = $1
  `;
  
  client
    .query(query, [body.UserID])
    .then(result => {
        response.json({'Username': result.rows[0].Username});
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

module.exports = {
  signup,
  login,
  validateUser,
  displayUserInfo
};