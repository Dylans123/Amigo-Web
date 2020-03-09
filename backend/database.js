require('dotenv').config({path: __dirname + '/.env'});

// Connect to database
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

// Sign up
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const key = process.env['JWT_KEY'];
const serverURL = "localhost:3000";

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
          RETURNING "UserID"
        `;

        client
          .query(query, [body.Username, password, body.FirstName, body.LastName, body.Email, body.PhoneNumber])
          .then(result => {
            // Send email verification request.
            const payload = {'host': serverURL, 'userID': result.rows[0].UserID, 'email': body.Email};
            sendVerificationEmail(payload);
            
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

// Login
const login = (request, response) => {
  const body = request.body;

  var query = `
    SELECT * FROM "Users" WHERE "Username" = $1
  `;
  
  client
    .query(query, [body.Username])
    .then(result => {
      // Check username and password.
      if (result.rows.length > 0 && bcrypt.compareSync(body.Password, result.rows[0].Password)) {
        const active = result.rows[0].Active;

        // Check verification status.
        if (active == true) {
          query = `
            UPDATE "Users" SET "LastLoggedIn" = NOW() WHERE "UserID" = $1
          `;

          client
            .query(query, [result.rows[0].UserID])
            .then(result => {
              const payload = {'Username': body.Username};
              const token = jwt.sign(payload, key, {expiresIn: "7d"});
              response.json({'success': true, 'message': 'Login successful!', 'token': token, 'verified': active});
            })
            .catch(error => {
              response.json({'success': false, 'message': error.toString()});
            });
        }
        else {
          response.json({'success': false, 'message': 'Login in failed.', 'verified': active});
        }
      }
      else {
        response.json({'success': false, 'message': 'Login in failed.'});
      }
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

// Validate user
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

// Email verification
const nodemailer = require("nodemailer");
const mailUsername = process.env['MAIL_USERNAME'];
const mailPassword = process.env['MAIL_PASSWORD'];
const verificationKey = process.env['EMAIL_VERIFIER_JWT_KEY'];

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: mailUsername,
      pass: mailPassword
  }
});

sendVerificationEmail = (body) => {
  const payload = {'UserID': body.userID, 'Email': body.email};
  const token = jwt.sign(payload, verificationKey, {expiresIn: "3d"});
  const link = "http://" + body.host + "/verify?token=" + token;

  const mailOptions = {
      'to': body.email,
      'subject': "Amigo: Verify your email address",
      'html': "Hello,<br><br>Please click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      response.json({'success': false, 'message': error.toString()});
    }
    else {
      response.json({'success': true, 'message': 'Verification request email sent.'});
    }
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

      const query = `
        UPDATE "Users" SET "Active" = true WHERE "UserID" = $1
      `;
      
      client
        .query(query, [payload.UserID])
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
  });
};

// Dispay user information
const displayUserInfo = (request, response) => {
  const body = request.body;

  const query = `
    SELECT * FROM "Users" WHERE "UserID" = $1
  `;
  
  client
    .query(query, [body.UserID])
    .then(result => {
        const user = result.rows[0];
        response.json({
          'Username': user.Username,
          'FirstName': user.FirstName,
          'LastName': user.LastName,
          'Email': user.Email,
          'PhoneNumber': user.PhoneNumber
      });
    })
    .catch(error => {
      response.json({'success': false, 'message': error.toString()});
    });
};

module.exports = {
  signup,
  login,
  validateUser,
  sendVerificationEmail,
  verifyEmail,
  displayUserInfo
};