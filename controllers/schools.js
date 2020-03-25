const db = require('../database');

// Get schools controller
getSchools = (request, response) => {
	const query = `
		SELECT *
		FROM schools
	`;

	db.client
		.query(query)
		.then(result => {
			response.status(200).json({'success': true, 'schools': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Get school by ID controller
getSchoolByID = (request, response) => {
	const params = request.params;

	const query = `
		SELECT name
		FROM schools
		WHERE school_id = $1
	`;

	db.client
		.query(query, [params.school_id])
		.then(result => {
			response.status(200).json({'success': true, 'name': result.rows[0].name});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

// Search schools controller
searchSchools = (request, response) => {
	const requestQuery = request.query;

	const query = `
		SELECT *
		FROM schools
		WHERE name ILIKE $1
	`;

	db.client
		.query(query, [requestQuery.query + "%"])
		.then(result => {
			response.status(200).json({'success': true, 'tags': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
};

module.exports = {
	getSchools,
	getSchoolByID,
	searchSchools
}