const db = require('../database');
const jwt = require('jsonwebtoken');

// Create channel controller
createChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	var query = `
		INSERT INTO channels (user_id, tag_id, name, description, school_id)
		VALUES ($1, $2, $3, $4)
		RETURNING channel_id
	`;

	db.client
		.query(query, [payload.user_id, body.tag_id, body.name, body.description, body.school_id])
		.then(result => {
			if (result.rowCount > 0) {
				// Join channel
				query = `
					INSERT INTO users_channels (user_id, channel_id)
					VALUES ($1, $2)
				`;

				db.client
					.query(query, [payload.user_id, result.rows[0].channel_id])
					.then(result => {
						if (result.rowCount > 0)
							response.status(200).json({'success': true, 'message': "Channel created successfully!"});
						else
							response.status(400).json({'success': false, 'message': 'Channel creation unsuccessful.'});
					})
					.catch(error => {
						response.status(400).json({'success': false, 'message': error.toString()});
					});
			}
			else {
				response.status(400).json({'success': false, 'message': "Channel creation unsuccessful."});
			}
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get user channels controller
getUserChannels = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT channels.channel_id, channels.name, channels.description, channels.school_id
		FROM users_channels, channels
		WHERE users_channels.user_id = $1 AND users_channels.channel_id = channels.channel_id
	`;

	db.client
		.query(query, [payload.user_id])
		.then(result => {
			response.status(200).json({'success': true, 'channels': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Join channel controller
joinChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		INSERT INTO users_channels (user_id, channel_id)
		VALUES ($1, $2)
	`;

	db.client
		.query(query, [payload.user_id, body.channel_id])
		.then(result => {
			if (result.rowCount > 0)
				response.status(200).json({'success': true, 'message': 'User has joined the channel.'});
			else
				response.status(400).json({'success': false, 'message': 'Join unsuccessful.'});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Leave channel controller
leaveChannel = (request, response) => {
	const body = request.body;
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		DELETE FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
			AND user_id NOT IN (SELECT channels.user_id FROM channels WHERE channels.channel_id = users_channels.channel_id)
	`;

	db.client
		.query(query, [payload.user_id, body.channel_id])
		.then(result => {
			if (result.rowCount > 0)
				response.status(200).json({'success': true, 'message': 'User has left the channel.'});
			else
				response.status(400).json({'success': false, 'message': 'Cannot unjoin.'});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get channels by tag controller
getChannelsByTag = (request, response) => {
	const params = request.params;

	const query = `
		SELECT channel_id, name, description, school_id
		FROM channels
		WHERE tag_id = $1
	`;

	db.client
		.query(query, [params.tag_id])
		.then(result => {
			response.status(200).json({'success': true, 'channels': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get channels by tag controller
getChannelsByTagAndSchool = (request, response) => {
	const params = request.params;

	const query = `
		SELECT channel_id, name, description, school_id
		FROM channels
		WHERE tag_id = $1 and school_id = $2
	`;

	db.client
		.query(query, [params.tag_id, params.school_id])
		.then(result => {
			response.status(200).json({'success': true, 'channels': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get channel member count controller
getChannelMemberCount = (request, response) => {
	const params = request.params;

	const query = `
		SELECT COUNT(*)
		FROM users_channels
		WHERE channel_id = $1
	`;

	db.client
		.query(query, [params.channel_id])
		.then(result => {
			response.status(200).json({'success': true, 'member_count': result.rows[0].count});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Search channels controller
searchChannels = (request, response) => {
	const requestQuery = request.query;

	const query = `
		SELECT channel_id, name, description, school_id
		FROM channels
		WHERE school_id = $1 AND name ILIKE $2
	`;

	db.client
		.query(query, [requestQuery.school_id, requestQuery.query + "%"])
		.then(result => {
			response.status(200).json({'success': true, 'channels': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Check to see if a user has joined a channel
checkChannelJoin = (user_id, channel_id, next) => {
	const query = `
		SELECT *
		FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
	`;

	db.client
		.query(query, [user_id, channel_id])
		.then(result => {
			return next(result.rows.length > 0);
		})
		.catch(error => {
			return false;
		});
}

module.exports = {
	getUserChannels,
	createChannel,
	joinChannel,
	leaveChannel,
	getChannelsByTag,
	getChannelMemberCount,
	getChannelsByTagAndSchool,
	searchChannels,
	checkChannelJoin
};