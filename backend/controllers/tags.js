const db = require('../database');
const jwt = require('jsonwebtoken');

// Create tag controller
createTag = (request, response) => {
	const body = request.body;

	const query = `
		INSERT INTO tags (name, location)
		VALUES ($1, $2)
	`;

	db.client
		.query(query, [body.name, body.location])
		.then(result => {
			if (result.rowCount > 0)
				response.json({'success': true, 'message': "Tag created successfully!"});
			else
				response.json({'success': false, 'message': "Tag creation unsuccessful."});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Get tags controller
getTags = (request, response) => {
	const body = request.body;

	const query = `
		SELECT tag_id, name, location
		FROM tags
	`;

	db.client
		.query(query)
		.then(result => {
			response.json({'success': true, 'tags': result.rows});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

// Get user tags
getUserTags = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT DISTINCT tags.tag_id, tags.name, tags.location
		FROM tags, channels, users_channels
		WHERE users_channels.user_id = $1
			AND users_channels.channel_id = channels.channel_id
			AND channels.tag_id = tags.tag_id
	`;

	db.client
		.query(query, [payload.user_id])
		.then(result => {
			response.json({'success': true, 'tags': result.rows});
		})
		.catch(error => {
			response.json({'success': false, 'message': error.toString()});
		});
};

module.exports = {
	createTag,
	getTags,
	getUserTags
};