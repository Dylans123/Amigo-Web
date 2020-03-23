const db = require('../database');

// Sign up controller
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const key = process.env['JWT_KEY'];
const adminKey = process.env['JWT_ADMIN_KEY'];
const serverURL = process.env['SERVER_URL'];
const {check, validationResult} = require('express-validator');

signup = (request, response) => {
	const body = request.body;
	const errors = validationResult(request);

	// Input is invalid and/or email has already been registered
	if (!errors.isEmpty()) {
		return response.status(422).json({'success': false, 'errors': errors.array()});
	}
	// Input is valid and email has not been registered, so add user
	else {
		const password = bcrypt.hashSync(body.password, saltRounds);

		query = `
			INSERT INTO users (email, password, first_name, last_name, display_name, last_logged_in, verified)
			VALUES ($1, $2, $3, $4, $5, NULL, false)
			RETURNING user_id
		`;

		db.client
			.query(query, [body.email, password, body.first_name, body.last_name, body.display_name])
			.then(result => {
				// Send verification request email
				const payload = {'query': {'email': body.email}};
				sendVerification(payload);

				response.status(200).json({'success': true, 'message': 'Sign up successful! Email verification request sent.'});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
};

// Check to see if email is already registered
checkEmail = (email, callback) => {
	var query = `
		SELECT *
		FROM users
		WHERE LOWER(email) = LOWER($1)
	`;

	db.client
		.query(query, [email])
		.then(result => {
			callback(result.rows.length > 0);
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Login controller
login = (request, response) => {
	const body = request.body;
	const errors = validationResult(request);

	// Input is missing
	if (!errors.isEmpty()) {
		return response.status(422).json({'success': false, 'errors': errors.array()});
	}
	// Input is not missing, so issue token
	else {
		var query = `
			SELECT *
			FROM users
			WHERE LOWER(email) = LOWER($1)
		`;

		db.client
			.query(query, [body.email])
			.then(result => {
				// Check email and password
				if (result.rows.length > 0 && bcrypt.compareSync(body.password, result.rows[0].password)) {
					const verified = result.rows[0].verified;
					const access_level = result.rows[0].access_level;

					// Check verification status
					if (verified == true || access_level >= 10) {
						const user_id = result.rows[0].user_id;

						query = `
							UPDATE users
							SET last_logged_in = NOW()
							WHERE user_id = $1
						`;

						db.client
							.query(query, [user_id])
							.then(result => {
								const payload = {'user_id': user_id};

								if (access_level >= 10)
									var token = jwt.sign(payload, adminKey, {expiresIn: "7d"});
								else
									var token = jwt.sign(payload, key, {expiresIn: "7d"});

								response.status(200).json({'success': true, 'message': 'Login successful!', 'x-access-token': token, 'verified': true});
							})
							.catch(error => {
								response.status(400).json({'success': false, 'message': error.toString()});
							});
					}
					else {
						response.status(403).json({'success': false, 'message': 'Email has not been verified.', 'verified': false});
					}
				}
				else {
					response.status(401).json({'success': false, 'message': 'Login failed.'});
				}
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
};

// Validate a user
validateUser = (request, response, next) => {
	jwt.verify(request.headers['x-access-token'], key, (error, decoded) => {
		if (error) {
			jwt.verify(request.headers['x-access-token'], adminKey, (error, decoded) => {
				if (error)
					response.status(400).json({'success': false, 'message': error.toString()});
				else
					next();
			});
		}
		else {
			next();
		}
	});
}

validateAdminUser = (request, response, next) => {
	jwt.verify(request.headers['x-access-token'], adminKey, (error, decoded) => {
		if (error)
			response.status(400).json({'success': false, 'message': error.toString()});
		else
			next();
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

	db.client
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
						response.status(400).json({'success': false, 'message': error.toString()});
					}
					else {
						response.status(200).json({'success': true, 'message': 'Verification request email sent.'});
					}
				});
			}
			else {
				response.status(400).json({'success': false, 'message': 'Email already verified or not registered.'});
			}
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

verifyEmail = (request, response) => {
	const token = request.query.token;

	jwt.verify(token, verificationKey, (error, decoded) => {
		if (error) {
			response.status(400).json({'success': false, 'message': 'Email verification failed.'});
		}
		else {
			const payload = jwt.decode(token);

			var query = `
				SELECT *
				FROM users
				WHERE LOWER(email) = $1 AND verified = false
			`;

			db.client
				.query(query, [payload.email])
				.then(result => {
					if (result.rows.length > 0) {
						query = `
							UPDATE users
							SET verified = true
							WHERE LOWER(email) = LOWER($1)
						`;

						db.client
							.query(query, [payload.email])
							.then(result => {
								if (result.rowCount > 0)
									response.status(200).json({'success': true, 'message': 'Email verified successfully.'});
								else
									response.status(400).json({'success': false, 'message': 'Problem with email verification.'});
							})
							.catch(error => {
								response.status(400).json({'success': false, 'message': error.toString()});
							});
					}
					else {
						response.status(400).json({'success': false, 'message': 'Email already verified or not registered.'});
					}
				})
				.catch(error => {
					response.status(400).json({'success': false, 'message': error.toString()});
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

	db.client
		.query(query, [payload.user_id])
		.then(result => {
			const user = result.rows[0];
			response.status(200).json({
				'success': true,
				'email': user.email,
				'first_name': user.first_name,
				'last_name': user.last_name,
				'display_name': user.display_name,
				'last_logged_in': user.last_logged_in
			});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Update user controller
updateUser = (request, response) => {
	const body = request.body;
	var errors = validationResult(request);
	const payload = jwt.decode(request.headers['x-access-token']);

	if (!errors.isEmpty()) {
		return response.status(422).json({'success': false, 'errors': errors.array()});
	}
	else {
		var query = `
			SELECT *
			FROM users
			WHERE user_id = $1
		`;

		db.client
			.query(query, [payload.user_id])
			.then(result => {
				if (!(result.rows.length > 0 && bcrypt.compareSync(body.password, result.rows[0].password))) {
					response.status(400).json({'success': false, 'message': 'Wrong Password.'});
				}
				else {
					query = `
						UPDATE users
						SET first_name = $2, last_name = $3, display_name = $4, location = $5
						WHERE user_id = $1
					`;

					db.client
						.query(query, [payload.user_id, body.first_name, body.last_name, body.display_name, body.location])
						.then(result => {
							var new_password = request.body.new_password;
							
							if (new_password == undefined) {
								response.status(200).json({'success': true, 'message': 'User info was successfully updated.'});
							}
							else {
								new_password = bcrypt.hashSync(body.new_password, saltRounds);

								query = `
									UPDATE users
									SET password = $2
									WHERE user_id = $1
								`;

								db.client
									.query(query, [payload.user_id, new_password])
									.then(result => {
										response.status(200).json({'success': true, 'message': 'User info was successfully updated.'});
									})
									.catch(error => {
										response.status(400).json({'success': false, 'message': error.toString()});
									});
							}
						})
						.catch(error => {
							response.status(400).json({'success': false, 'message': error.toString()});
						});
				}
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
};

module.exports = {
	signup,
	checkEmail,
	login,
	validateUser,
	validateAdminUser,
	sendVerification,
	verifyEmail,
	getUserInfo,
	updateUser
};