require('dotenv').config({path: __dirname + '/.env'});

// Connect to the database.
const pg = require('pg');
const port = 5432;

const config = {
  host: process.env['DB_HOST'],
  user: process.env['DB_USERNAME'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
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

// Sign up controller
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const key = process.env['JWT_KEY'];
const serverURL = "localhost:3000";
const {check, validationResult} = require('express-validator');

signup = (request, response) => {
  const body = request.body;
  const errors = validationResult(request);

  // Input is invalid and/or username has already been taken.
  if (!errors.isEmpty()) {
    return response.json({'errors': errors.array()})
  }
  // Input is valid and username has not been taken, so add user.
  else {
    const password = bcrypt.hashSync(body.Password, saltRounds);
    
    query = `
      INSERT INTO "Users" ("Username", "Password", "FirstName", "LastName", "Email", "PhoneNumber", "LastLoggedIn", "CreatedOn")
      VALUES ($1, $2, $3, $4, $5, $6, NULL, NOW())
      RETURNING "UserID"
    `;

    client
      .query(query, [body.Username, password, body.FirstName, body.LastName, body.Email, body.PhoneNumber])
      .then(result => {
        // Send verification request email.
        const payload = {'query': {'Email': body.Email}};
        sendVerification(payload);
        
        response.json({'success': true, 'message': 'Sign up successful! Email verification request sent.'});
      })
      .catch(error => {
        response.json({'success': false, 'message': error.toString()});
      });
  }
};

// Checks to see if username already exists.
checkUsername = (username, callback) => {
  var query = `
    SELECT * FROM "Users" WHERE LOWER("Username") = LOWER($1)
  `;

  client
    .query(query, [username])
    .then(result => {
        callback(result.rows.length > 0);
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

// Checks to see if email already used.
checkEmail = (username, callback) => {
  var query = `
    SELECT * FROM "Users" WHERE LOWER("Email") = LOWER($1)
  `;

  client
    .query(query, [username])
    .then(result => {
        callback(result.rows.length > 0);
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

// Login controller
login = (request, response) => {
  const body = request.body;
  const errors = validationResult(request);

  // Input is missing.
  if (!errors.isEmpty()) {
    return response.json({'errors': errors.array()})
  }
  // Input is not missing, so issue token.
  else {
    var query = `
      SELECT * FROM "Users" WHERE LOWER("Username") = LOWER($1)
    `;
    
    client
      .query(query, [body.Username])
      .then(result => {
        // Check username and password.
        if (result.rows.length > 0 && bcrypt.compareSync(body.Password, result.rows[0].Password)) {
          const active = result.rows[0].Active;

          // Check verification status.
          if (active == true) {
            const userID = result.rows[0].UserID;
            
            query = `
              UPDATE "Users" SET "LastLoggedIn" = NOW() WHERE "UserID" = $1
            `;

            client
              .query(query, [userID])
              .then(result => {
                const payload = {'UserID': userID};
                const token = jwt.sign(payload, key, {expiresIn: "7d"});
                response.json({'success': true, 'message': 'Login successful!', 'x-access-token': token, 'verified': active});
              })
              .catch(error => {
                response.json({'success': false, 'message': error.toString()});
              });
          }
          else {
            response.json({'success': false, 'message': 'Email has not been verified.', 'verified': active});
          }
        }
        else {
          response.json({'success': false, 'message': 'Login failed.'});
        }
      })
      .catch(error => {
        response.json({'success': false, 'message': error.toString()});
      });
  }
};

// Validates a user.
validateUser = (request, response, next) => {
  jwt.verify(request.headers['x-access-token'], key, (error, decoded) => {
    if (error) {
      response.json({'success': false, 'message': error.toString()});
    }
    else {
      next();
    }
  });
}

// Email verification controllers
const nodemailer = require("nodemailer");
const mailUsername = process.env['MAIL_USERNAME'];
const mailPassword = process.env['MAIL_PASSWORD'];
const verificationKey = process.env['EMAIL_VERIFIER_JWT_KEY'];

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: mailUsername,
      pass: mailPassword
  }
});

sendVerification = (request, response) => {
  const requestQuery = request.query;

  const query = `
    SELECT * FROM "Users" WHERE LOWER("Email") = LOWER($1) AND "Active" = false
  `;
  
  client
    .query(query, [requestQuery.Email])
    .then(result => {
      if (result.rows.length > 0) {
        const payload = {'Email': requestQuery.Email};
        const token = jwt.sign(payload, verificationKey, {expiresIn: "3d"});
        const link = "http://" + serverURL + "/verify?token=" + token;

        const mailOptions = {
            'to': requestQuery.Email,
            'subject': "Amigo: Verify your email address",
            'html': "Hello,<br><br>Please click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        }

        smtpTransport.sendMail(mailOptions, (error, transportResponse) => {
          if (error) {
            response.json({'success': false, 'message': error.toString()});
          }
          else {
            response.json({'success': true, 'message': 'Verification request email sent.'});
          }
        });
      }
      else {
        response.json({'success': false, 'message': 'Email already verified or not registered.'});
      }
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

verifyEmail = (request, response) => {
  const token = request.query.token;

  jwt.verify(token, verificationKey, (error, decoded) => {
    if (error) {
      response.json({'success': false, 'message': 'Email verification failed.'});
    }
    else {
      const payload = jwt.decode(token);

      var query = `
        SELECT "Active" FROM "Users" WHERE LOWER("Email") = $1 AND "Active" = false
      `;
      
      client
        .query(query, [payload.Email])
        .then(result => {
          if (result.rowCount > 0) {
            query = `
              UPDATE "Users" SET "Active" = true WHERE LOWER("Email") = LOWER($1)
            `;
            
            client
              .query(query, [payload.Email])
              .then(result => {
                if (result.rowCount > 0) {
                  response.json({'success': true, 'message': 'Email verified successfully.'});
                }
                else {
                  response.json({'success': false, 'message': 'Problem with email verification.'});
                }
              })
              .catch(error => {
                response.json({'success': false, 'message': error.toString()});
              });
          }
          else {
            response.json({'success': false, 'message': 'Email already verified or not registered.'});
          }
        })
        .catch(error => {
          response.json({'success': false, 'message': error.toString()});
        });
    }
  });
};

// Get user information controller
user = (request, response) => {
  const payload = jwt.decode(request.headers['x-access-token']);

  const query = `
    SELECT * FROM "Users" WHERE "UserID" = $1
  `;
  
  client
    .query(query, [payload.UserID])
    .then(result => {
        const user = result.rows[0];
        response.json({
          'Username': user.Username,
          'FirstName': user.FirstName,
          'LastName': user.LastName,
          'Email': user.Email,
          'PhoneNumber': user.PhoneNumber,
          'LastLoggedIn': user.LastLoggedIn
      });
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

// Get user groups controller
groups = (request, response) => {
  const payload = jwt.decode(request.headers['x-access-token']);

  const query = `
    SELECT "Groups"."Name", "Groups"."Description", "Groups"."Location"
    FROM "UsersGroups", "Groups" 
    WHERE "UsersGroups"."UserID" = $1 AND "UsersGroups"."GroupID" = "Groups"."GroupID"
  `;

  client
    .query(query, [payload.UserID])
    .then(result => {
        response.json(result.rows);
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

module.exports = {
  signup,
  checkUsername,
  checkEmail,
  login,
  validateUser,
  sendVerification,
  verifyEmail,
  user,
  groups
};