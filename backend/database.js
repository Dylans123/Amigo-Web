require('dotenv').config({path: __dirname + '/.env'});

// Connect to the database
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
const serverURL = process.env['SERVER_URL'];
const {check, validationResult} = require('express-validator');

signup = (request, response) => {
	const body = request.body;
	const errors = validationResult(request);

	// Input is invalid and/or email has already been registered
	if (!errors.isEmpty()) {
		return response.json({'success': false, 'errors': errors.array()});
	}
	// Input is valid and email has not been registered, so add user
	else {
		const password = bcrypt.hashSync(body.password, saltRounds);

		query = `
			INSERT INTO users (email, password, first_name, last_name, display_name, last_logged_in, created_on, verified)
			VALUES ($1, $2, $3, $4, $5, NULL, NOW(), false)
			RETURNING user_id
		`;

		client
			.query(query, [body.email, password, body.first_name, body.last_name, body.display_name])
			.then(result => {
				// Send verification request email
				const payload = {'query': {'email': body.email}};
				sendVerification(payload);

				response.json({'success': true, 'message': 'Sign up successful! Email verification request sent.'});
			})
			.catch(error => {
				response.json({'success': false, 'message': error.toString()});
			});
	}
};

// Check to see if email already registered
checkEmail = (email, callback) => {
	var query = `
		SELECT *
		FROM users
		WHERE LOWER(email) = LOWER($1)
	`;

	client
		.query(query, [email])
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

	// Input is missing
	if (!errors.isEmpty()) {
		return response.json({'success': false, 'errors': errors.array()});
	}
	// Input is not missing, so issue token
	else {
		var query = `
			SELECT *
			FROM users
			WHERE LOWER(email) = LOWER($1)
		`;

		client
			.query(query, [body.email])
			.then(result => {
				// Check email and password
				if (result.rows.length > 0 && bcrypt.compareSync(body.password, result.rows[0].password)) {
					const verified = result.rows[0].verified;

					// Check verification status
					if (verified == true) {
						const user_id = result.rows[0].user_id;

						query = `
							UPDATE users
							SET last_logged_in = NOW()
							WHERE user_id = $1
						`;

						client
							.query(query, [user_id])
							.then(result => {
								const payload = {'user_id': user_id};
								const token = jwt.sign(payload, key, {expiresIn: "7d"});
								response.json({'success': true, 'message': 'Login successful!', 'x-access-token': token, 'verified': true});
							})
							.catch(error => {
								response.json({'success': false, 'message': error.toString()});
							});
					}
					else {
						response.json({'success': false, 'message': 'Email has not been verified.', 'verified': false});
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

// Validate a user
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
		SELECT *
		FROM users
		WHERE LOWER(email) = LOWER($1) AND verified = false
	`;

	client
		.query(query, [requestQuery.email])
		.then(result => {
			if (result.rows.length > 0) {
				const payload = {'email': requestQuery.email};
				const token = jwt.sign(payload, verificationKey, {expiresIn: "3d"});
				const link = "http://" + serverURL + "/verify?token=" + token;

				const mailOptions = {
					'to': requestQuery.email,
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
				SELECT *
				FROM users
				WHERE LOWER(email) = $1 AND verified = false
			`;

			client
				.query(query, [payload.email])
				.then(result => {
					if (result.rowCount > 0) {
						query = `
							UPDATE users
							SET verified = true
							WHERE LOWER(email) = LOWER($1)
						`;

						client
							.query(query, [payload.email])
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
getUserInfo = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT *
		FROM users
		WHERE user_id = $1
	`;

	client
		.query(query, [payload.user_id])
		.then(result => {
			const user = result.rows[0];
			response.json({
				'success': true,
				'email': user.email,
				'first_name': user.first_name,
				'last_name': user.last_name,
				'display_name': user.display_name,
				'last_logged_in': user.last_logged_in
			});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Create tag controller
createTag = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		INSERT INTO tags (name, location, created_on)
		VALUES ($1, $2, $3)
	`;

	client
		.query(query, [body.name, body.location, NOW()])
		.then(result => {
			response.json({'success': true, 'message': "Tag created successfully!"});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Create channel controller
createChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		INSERT INTO channels (user_id, tag_id, name, description, created_on)
		VALUES ($1, $2, $3, $4, $5)
	`;

	client
		.query(query, [payload.user_id, body.tag_id, name, description, NOW()])
		.then(result => {
			response.json({'success': true, 'message': "Channel created successfully!"});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Get user channels controller
getUserChannels = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT channels.name, channels.description
		FROM users_channels, channels
		WHERE users_channels.user_id = $1 AND users_channels.channel_id = channels.channel_id
	`;

	client
		.query(query, [payload.user_id])
		.then(result => {
			response.json({'success': true, 'channels': result.rows});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Join channel controller
joinChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		INSERT INTO users_channels (user_id, channel_id, created_on)
		WHERE ($1, $2, $3)
	`;

	client
		.query(query, [payload.user_id, body.channel_id, NOW()])
		.then(result => {
			response.json({'success': true, 'message': 'User has joined channel.'});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Unjoin channel controller
unjoinChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		DELETE FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
	`;

	client
		.query(query, [payload.user_id, body.channel_id])
		.then(result => {
			response.json({'success': true, 'message': 'User has unjoined channel.'});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

module.exports = {
	signup,
	checkEmail,
	login,
	validateUser,
	sendVerification,
	verifyEmail,
	getUserInfo,
	getUserChannels
};