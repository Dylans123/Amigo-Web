const db = require('../database');
const jwt = require('jsonwebtoken');
const io = require('../websocket').io();

// Get messages controller
getMessages = (request, response) => {
	const params = request.params;
	const payload = jwt.decode(request.headers['x-access-token']);

	// Check to see if user has joined channel
	var query = `
		SELECT *
		FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
	`;

	db.client
		.query(query, [payload.user_id, params.channel_id])
		.then(result => {
			if (result.rows.length > 0) {
				// Get messages
				query = `
					SELECT channel_messages.message_id, users.display_name, channel_messages.message, channel_messages.created_on
					FROM channel_messages, users
					WHERE channel_messages.channel_id = $1 AND users.user_id = channel_messages.user_id
					ORDER BY channel_messages.created_on
				`;

				db.client
					.query(query, [params.channel_id])
					.then(result => {
						response.status(200).json({'success': true, 'messages': result.rows});
					})
					.catch(error => {
						response.status(400).json({'success': false, 'message': error.toString()});
					});
			}
			else {
				response.status(400).json({'success': false, 'message': 'User needs to join channel first.'});
			}
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Send message controller
sendMessage = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	// Check to see if user has joined channel
	var query = `
		SELECT *
		FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
	`;

	db.client
		.query(query, [payload.user_id, body.channel_id])
		.then(result => {
			if (result.rows.length > 0) {
				// Send message
				query = `
					INSERT INTO channel_messages (user_id, channel_id, message)
					VALUES ($1, $2, $3)
					RETURNING message_id, created_on
				`;

				db.client
					.query(query, [payload.user_id, body.channel_id, body.message])
					.then(result => {
						const message_id = result.rows[0].message_id;
						const created_on = result.rows[0].created_on;

						query = `
							SELECT display_name
							FROM users
							WHERE user_id = $1
						`;

						db.client
							.query(query, [payload.user_id])
							.then(result => {
								const display_name = result.rows[0].display_name;

								io.to(body.channel_id).emit('message', {
									'message_id': message_id,
									'display_name': display_name,
									'message': body.message,
									'created_on': created_on
								});

								response.status(200).json({'success': true, 'message': 'Message sent successfully.'});
							})
							.catch(error => {
								response.status(400).json({'success': false, 'message': error.toString()});
							});
					})
					.catch(error => {
						response.status(400).json({'success': false, 'message': error.toString()});
					});
			}
			else {
				response.status(400).json({'success': false, 'message': 'User needs to join channel first.'});
			}
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get direct messages controller
getDirectMessages = (request, response) => {
	const params = request.params;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT direct_messages.message_id, R.display_name AS receiver_display_name, S.display_name AS sender_display_name, direct_messages.message, direct_messages.created_on
		FROM direct_messages, users R, users S
		WHERE (direct_messages.receiver_user_id = $1 AND direct_messages.sender_user_id = $2 AND R.user_id = $1 AND S.user_id = $2)
			OR (direct_messages.receiver_user_id = $2 AND direct_messages.sender_user_id = $1 AND R.user_id = $2 AND S.user_id = $1)
		ORDER BY direct_messages.created_on
	`;

	db.client
		.query(query, [payload.user_id, params.sender_user_id])
		.then(result => {
			response.status(200).json({'success': true, 'messages': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Send direct message controller
sendDirectMessage = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	var query = `
		INSERT INTO direct_messages (sender_user_id, receiver_user_id, message)
		VALUES ($1, $2, $3)
		RETURNING message_id, created_on
	`;

	db.client
		.query(query, [payload.user_id, body.receiver_user_id, body.message])
		.then(result => {
			const message_id = result.rows[0].message_id;
			const created_on = result.rows[0].created_on;

			query = `
				SELECT S.display_name AS sender_display_name, R.display_name AS receiver_display_name
				FROM users S, users R
				WHERE S.user_id = $1 AND R.user_id = $2
			`;

			db.client
				.query(query, [payload.user_id, body.receiver_user_id])
				.then(result => {
					const sender_display_name = result.rows[0].sender_display_name;
					const receiver_display_name = result.rows[0].receiver_display_name;

					io
						.to(payload.user_id + ":" + body.receiver_user_id)
						.to(body.receiver_user_id + ":" + payload.user_idd)
						.emit('message', {
							'message_id': message_id,
							'receiver_display_name': receiver_display_name,
							'sender_display_name': sender_display_name,
							'message': body.message,
							'created_on': created_on
						});

					response.status(200).json({'success': true, 'message': 'Message sent successfully.'});
				})
				.catch(error => {
					response.status(400).json({'success': false, 'message': error.toString()});
				});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get direct message user list controller
getDirectMessageUsers = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT DISTINCT users.user_id, users.display_name
		FROM direct_messages, users
		WHERE (direct_messages.receiver_user_id = $1 AND users.user_id = direct_messages.sender_user_id)
			OR (direct_messages.sender_user_id = $1 AND users.user_id = direct_messages.receiver_user_id)
		ORDER BY users.display_name
	`;

	db.client
		.query(query, [payload.user_id])
		.then(result => {
			response.status(200).json({'success': true, 'users': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

module.exports = {
	getMessages,
	sendMessage,
	getDirectMessages,
	sendDirectMessage,
	getDirectMessageUsers
};