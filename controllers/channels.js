const db = require('../database');
const jwt = require('jsonwebtoken');
const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../keys.json');
const {Storage} = Cloud;
const storage = new Storage({keyFilename: serviceKey});
const bucket = storage.bucket('amigo-bucket');

// Create channel controller
createChannel = (request, response) => {
	const body = request.body;
	const file = request.file;
	const payload = jwt.decode(request.headers['x-access-token']);

	var query = `
		INSERT INTO channels (user_id, tag_id, name, description, school_id)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING channel_id
	`;

	db.client
		.query(query, [payload.user_id, body.tag_id, body.name, body.description, body.school_id])
		.then(result => {
			if (result.rowCount > 0) {
				const channel_id = result.rows[0].channel_id
				// Join channel
				query = `
					INSERT INTO users_channels (user_id, channel_id)
					VALUES ($1, $2)
				`;

				db.client
					.query(query, [payload.user_id, channel_id])
					.then(result => {
						if (result.rowCount > 0)
							response.status(200).json({'success': true, 'message': "Channel created successfully!"});
						else
							response.status(400).json({'success': false, 'message': 'Channel creation unsuccessful.'});
					})
					.catch(error => {
						response.status(400).json({'success': false, 'message': error.toString()});
					});
				
				// Add the channel image
				if (file !== undefined) {
					const {originalname, buffer} = file;
					const blob = bucket.file("channels/" + channel_id + originalname.replace(/^.*\./, "."));
					const blobStream = blob.createWriteStream({resumable: false});
	
					blobStream
						.on('finish', () => {
							imageURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
	
							const query = `
								UPDATE channels
								SET photo = $2
								WHERE channel_id = $1
							`;
	
							db.client
								.query(query, [channel_id, imageURL])
								.then(result => {
									response.status(200).json({'success': true, 'message': 'Channel photo added succesfully!'});
								})
								.catch(error => {
									response.status(400).json({'success': false, 'message': error.toString()});
								});
						})
						.on('error', () => {
							response.status(400).json({'success': false, 'message': error.toString()});
						})
						.end(buffer)
				}
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

getChannelUsers = (request, response) => {
	const requestQuery = request.query;

	const query = `
		SELECT users.user_id, users.first_name, users.last_name, users.display_name
		FROM users
		JOIN users_channels ON users.user_id = users_channels.user_id
		AND users_channels.channel_id = ${requestQuery.channel_id}
	`;

	db.client
		.query(query)
		.then(result => {
			response.status(200).json({'success': true, 'users': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
}

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

removeChannelUser = (request, response) => {
	const body = request.body;

	const query = `
		DELETE FROM users_channels
		WHERE user_id = $1 AND channel_id = $2
			AND user_id NOT IN (SELECT channels.user_id FROM channels WHERE channels.channel_id = users_channels.channel_id)
	`;

	db.client
		.query(query, [body.user_id, body.channel_id])
		.then(result => {
			if (result.rowCount > 0)
				response.status(200).json({'success': true, 'message': 'User has been removed from the channel.'});
			else
				response.status(400).json({'success': false, 'message': 'Cannot remove this user from this channel.'});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
}

// Get channel member count controller
getChannelMemberCount = (request, response) => {
	const requestQuery = request.query;

	const query = `
		SELECT COUNT(*)
		FROM users_channels
		WHERE channel_id = $1
	`;

	db.client
		.query(query, [requestQuery.channel_id])
		.then(result => {
			response.status(200).json({'success': true, 'member_count': result.rows[0].count});
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

// Get channels controller
getChannels = (request, response) => {
	const requestQuery = request.query;
	var query;

	// Get all
	if (requestQuery.tag_id === undefined && requestQuery.school_id === undefined && requestQuery.query === undefined) {
		query = `
			SELECT channel_id, name, description, school_id, member_count
			FROM channels
		`;

		db.client
			.query(query)
			.then(result => {
				return response.status(200).json({ success: true, channels: result.rows });
			})
			.catch(error => {
				return response.status(400).json({ success: false, message: 'failure' });
			});
	}
	// By tag_id
	else if (!(requestQuery.tag_id === undefined) && requestQuery.school_id === undefined && requestQuery.query === undefined) {
		query = `
			SELECT channel_id, name, description, school_id, member_count
			FROM channels
			WHERE tag_id = $1
		`;

		db.client
			.query(query, [requestQuery.tag_id])
			.then(result => {
				response.status(200).json({'success': true, 'channels': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By tag_id and school_id
	else if (!(requestQuery.tag_id === undefined) && !(requestQuery.school_id === undefined) && requestQuery.query === undefined) {
		query = `
			SELECT channel_id, name, description, school_id, member_count
			FROM channels
			WHERE tag_id = $1 and school_id = $2
		`;

		db.client
			.query(query, [requestQuery.tag_id, requestQuery.school_id])
			.then(result => {
				response.status(200).json({'success': true, 'channels': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By school_id and search query
	else if (requestQuery.tag_id === undefined && !(requestQuery.school_id === undefined) && !(requestQuery.query === undefined)) {
		const requestQuery = request.query;

		const query = `
			SELECT channel_id, name, description, school_id, member_count
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
	}
	// By tag_id and search query
	else if (!(requestQuery.tag_id === undefined) && requestQuery.school_id === undefined && !(requestQuery.query === undefined)) {
		const requestQuery = request.query;

		const query = `
			SELECT channel_id, name, description, school_id, member_count
			FROM channels
			WHERE tag_id = $1 AND name ILIKE $2
		`;

		db.client
			.query(query, [requestQuery.tag_id, requestQuery.query + "%"])
			.then(result => {
				response.status(200).json({'success': true, 'channels': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// Invalid
	else {
		response.status(400).json({'success': false, 'message': 'Set of queries provided is not valid.'});
	}
};

// Get channels controller
getChannelInfo = (request, response) => {
	const requestQuery = request.query;

	const query = `
		SELECT channel_id, name, description, school_id, member_count
		FROM channels
		WHERE channel_id = $1
	`;

	db.client
		.query(query, [requestQuery.channel_id])
		.then(result => {
			response.status(200).json({
				'success': true,
				'channel_id': result.rows[0].channel_id,
				'name': result.rows[0].name,
				'description': result.rows[0].description,
				'school_id': result.rows[0].school_id,
				'member_count': result.rows[0].member_count
			});
		})
		.catch(error => {
			return response.status(400).json({'success': true, 'message': error.toString()});
		});
};

module.exports = {
	getUserChannels,
	getChannelUsers,
	createChannel,
	joinChannel,
	leaveChannel,
	getChannelMemberCount,
	checkChannelJoin,
	getChannels,
	removeChannelUser,
	getChannelInfo
};