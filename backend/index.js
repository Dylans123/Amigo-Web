const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');
const {check, validationResult} = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post(
	'/api/signup',
	[
		check('email')
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
		check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters.'),
		check('confirmation_password').custom((value, {req}) => (value === req.body.password)).withMessage('Passwords do not match.'),
		check('first_name').isAlpha().withMessage('First name is invalid.'),
		check('last_name').isAlpha().withMessage('Last name is invalid.'),
		check('display_name')
			.isAlphanumeric().withMessage("Display name is not valid.")
			.isLength({min: 3}).withMessage('Display name must be at least 3 characters.')
	],
	db.signup
);

app.post(
	'/api/login',
	[
		check('email').not().isEmpty().withMessage("Username is missing."),
		check('password').not().isEmpty().withMessage("Password is missing.")
	],
	db.login
);

// Code to generate frontend build directory
var arr = __dirname.split('/');
arr.pop();
arr.push('frontend')
arr.push('dist')
const dir = arr.join('/')

app.get('/verify', db.verifyEmail);
app.get('/api/sendverification', db.sendVerification);
app.get('/api/user', db.validateUser, db.getUserInfo);
app.get('/api/channels', db.validateUser, db.getUserChannels);

app.use(express.static(dir))
app.get("/*", (req, res) => {
	res.sendFile(path.join(dir, "/index.html"));
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
});