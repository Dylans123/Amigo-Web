const db = require('../database');
const jwt = require('jsonwebtoken');
const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../keys.json');
const {Storage} = Cloud;
const storage = new Storage({keyFilename: serviceKey});
const bucket = storage.bucket('amigo-bucket');

// Create tag controller
createTag = (request, response) => {
	const body = request.body;
	const file = request.file;
	var fileTypeError = request.fileValidationError;
	var imageURL;

	if (fileTypeError) {
		return response.status(422).json({'success': false, 'errors': [{'msg': fileTypeError}]});
	}
	if (file === undefined) {
		
	}
	const query = `
		INSERT INTO tags (name)
		VALUES ($1);
	`;

	db.client
		.query(query, [body.name])
		.then(result => {
			if (file != undefined) {
				const query = `
					SELECT currval(pg_get_serial_sequence('tags','tag_id'));
				`
				db.client
					.query(query)
					.then(result => {
						const tag_id = result.rows[0].currval;
						const {originalname, buffer} = file;
						const blob = bucket.file("tags/" + tag_id + originalname.replace(/^.*\./, "."));
						const blobStream = blob.createWriteStream({resumable: false});
		
						blobStream
							.on('finish', () => {
								imageURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
		
								const query = `
									UPDATE tags
									SET photo = $2
									WHERE tag_id = $1
								`;
		
								db.client
									.query(query, [tag_id, imageURL])
									.then(result => {
										response.status(200).json({'success': true, 'message': 'Tag info was successfully updated.'});
									})
									.catch(error => {
										response.status(400).json({'success': false, 'message': error.toString()});
									});
							})
							.on('error', () => {
								response.status(400).json({'success': false, 'message': error.toString()});
							})
							.end(buffer)
					})
					.catch(err => {
						response.status(400).json({'success': false, 'message': err.toString()});
					})
				}
				else if (result.rowCount > 0) {
					response.status(200).json({'success': true, 'message': "Tag created successfully!"});
				}
				else {
					response.status(400).json({'success': false, 'message': "Tag creation unsuccessful."});
				}
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get tags controller
getTags = (request, response) => {
	const requestQuery = request.query;
	var query;
	var requestQueryParameter;

	// All
	if (requestQuery.school_id === undefined && requestQuery.query === undefined && requestQuery.exact === undefined) {
		query = `
			SELECT tag_id, name
			FROM tags
		`;

		db.client
			.query(query)
			.then(result => {
				response.status(200).json({'success': true, 'tags': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By search query
	else if (requestQuery.school_id === undefined && !(requestQuery.query === undefined)) {
		if (requestQuery.exact === undefined || requestQuery.exact === "false") {
			query = `
				SELECT tag_id, name
				FROM tags
				WHERE tags.name ILIKE $1
			`;

			requestQueryParameter = requestQuery.query + "%";
		}
		else {
			query = `
				SELECT tags.tag_id, tags.name
				FROM tags
				WHERE LOWER(tags.name) = LOWER($1)
			`;

			requestQueryParameter = requestQuery.query;
		}

		db.client
			.query(query, [requestQueryParameter])
			.then(result => {
				response.status(200).json({'success': true, 'tags': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By school_id
	else if (!(requestQuery.school_id === undefined) && requestQuery.query === undefined) {
		query = `
			SELECT DISTINCT tags.tag_id, tags.name
			FROM tags, channels
			WHERE channels.school_id = $1 AND channels.tag_id = tags.tag_id
		`;

		db.client
			.query(query, [requestQuery.school_id])
			.then(result => {
				response.status(200).json({'success': true, 'tags': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By school_id and search query
	else if (!(requestQuery.school_id === undefined) && !(requestQuery.query === undefined)) {
		if (requestQuery.exact === undefined || requestQuery.exact === "false") {
			query = `
				SELECT DISTINCT tags.tag_id, tags.name
				FROM tags, channels
				WHERE tags.tag_id = channels.tag_id AND channels.school_id = $1 AND tags.name ILIKE $2
			`;

			requestQueryParameter = requestQuery.query + "%";
		}
		else {
			query = `
				SELECT DISTINCT tags.tag_id, tags.name
				FROM tags, channels
				WHERE tags.tag_id = channels.tag_id AND channels.school_id = $1 AND LOWER(tags.name) = LOWER($2)
			`;

			requestQueryParameter = requestQuery.query;
		}

		db.client
			.query(query, [requestQuery.school_id, requestQueryParameter])
			.then(result => {
				response.status(200).json({'success': true, 'tags': result.rows});
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

// Get user tags controller
getUserTags = (request, response) => {
	const payload = jwt.decode(request.headers['x-access-token']);

	const query = `
		SELECT DISTINCT tags.tag_id, tags.name
		FROM tags, channels, users_channels
		WHERE users_channels.user_id = $1
			AND users_channels.channel_id = channels.channel_id
			AND channels.tag_id = tags.tag_id
	`;

	db.client
		.query(query, [payload.user_id])
		.then(result => {
			response.status(200).json({'success': true, 'tags': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Updates user tags controller
updateTags = (request, response) => {
	const body = request.body;
	const file = request.file;
	var fileTypeError = request.fileValidationError;
	var imageURL;

	if (fileTypeError) {
		return response.status(422).json({'success': false, 'errors': [{'msg': fileTypeError}]});
	}
	else {
		query = `
			UPDATE tags
			SET name = $2
			WHERE tag_id = $1
		`;

		db.client
			.query(query, [body.tag_id, body.name])
			.then(result => {
				if (file != undefined) {
					const {originalname, buffer} = file;
					const blob = bucket.file("tags/" + body.tag_id + originalname.replace(/^.*\./, "."));
					const blobStream = blob.createWriteStream({resumable: false});

					blobStream
						.on('finish', () => {
							imageURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

							query = `
								UPDATE tags
								SET photo = $2
								WHERE tag_id = $1
							`;

							db.client
								.query(query, [body.tag_id, imageURL])
								.then(result => {
									response.status(200).json({'success': true, 'message': 'Tag info was successfully updated.'});
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
				else {
					response.status(200).json({'success': true, 'message': 'Tag info was successfully updated.'});
				}
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
};

module.exports = {
	createTag,
	getTags,
	getUserTags,
	updateTags
};