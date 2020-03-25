const db = require('../database');

// Get schools controller
getSchools = (request, response) => {
	const requestQuery = request.query;
	var query;

	// All
	if (requestQuery.school_id === undefined && requestQuery.query === undefined) {
		query = `
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
	}
	// By school_id
	else if (!(requestQuery.school_id === undefined) && requestQuery.query === undefined) {
		query = `
			SELECT *
			FROM schools
			WHERE school_id = $1
		`;

		db.client
			.query(query, [requestQuery.school_id])
			.then(result => {
				response.status(200).json({'success': true, 'schools': result.rows});
			})
			.catch(error => {
				response.status(400).json({'success': false, 'message': error.toString()});
			});
	}
	// By search query
	else if (requestQuery.school_id === undefined && !(requestQuery.query === undefined)) {
		query = `
			SELECT *
			FROM schools
			WHERE name ILIKE $1
		`;

		db.client
			.query(query, [requestQuery.query + "%"])
			.then(result => {
				response.status(200).json({'success': true, 'schools': result.rows});
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

module.exports = {
	getSchools
}