const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./database');
const {check, validationResult} = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'})
});

app.post(
  '/api/signup',
  [
    check('Username')
      .isLength({min: 3}).withMessage('Username must be at least 3 characters.')
      .custom(value => {
        return new Promise((resolve, reject) => {
          db.checkUsername(value, taken => {
            if (taken) {
              reject(new Error('Username has already been taken.'));
            }
            else {
              resolve(true);
            }
          });
        });
      }),
    check('Password').isLength({min: 6}).withMessage('Password must be at least 6 characters.'),
    check('ConfirmationPassword').custom((value, {req}) => (value === req.body.Password)).withMessage('Passwords do not match.'),
    check('FirstName').isAlpha().withMessage('First name is invalid.'),
    check('LastName').isAlpha().withMessage('Last name is invalid.'),
    check('Email')
      .isEmail().withMessage('Email is invalid.')
      .custom(value => {
        return new Promise((resolve, reject) => {
          db.checkEmail(value, taken => {
            if (taken) {
              reject(new Error('Email already registered.'));
            }
            else {
              resolve(true);
            }
          });
        });
      }),
  ],
  db.signup
);

app.post(
  '/api/login',
  [
    check('Username').not().isEmpty().withMessage("Username is missing."),
    check('Password').not().isEmpty().withMessage("Password is missing.")
  ], 
  db.login
);

app.get('/verify', db.verifyEmail);
app.post('/api/sendVerificationEmail', db.sendVerificationEmail);
app.get('/api/userInfo', db.validateUser, db.userInfo);
app.get('/api/groups', db.groups)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});