const db = require('../database');
const jwt = require('jsonwebtoken');
const io = require('../websocket').io();

// Get messages controller
getMessages = (request, response) => {
	const params = request.params;

	const query = `
		SELECT channel_messages.message_id, users.display_name, channel_messages.message, channel_messages.created_on
		FROM channel_messages, users
		WHERE channel_id = $1 AND users.user_id = channel_messages.user_id
		ORDER BY channel_messages.created_on
	`;

	db.client
		.query(query, [params.channel_id])
		.then(result => {
			response.json({'success': true, 'messages': result.rows});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Send message controller
sendMessage = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	var query = `
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
				SELECT users.display_name
				FROM users
				WHERE user_id = $1
			`;

			db.client
				.query(query, [payload.user_id])
				.then(result => {
					io.emit('message', {
						'message_id': result.rows[0].message_id,
						'display_name': result.rows[0].display_name,
						'message': body.message,
						'created_on': created_on
					});

					response.json({'success': true, 'message': 'Message sent successfully.'});
				})
				.catch(error => {
					response.json({'success': false, 'message': error.toString()});
				});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

module.exports = {
	getMessages,
	sendMessage
};