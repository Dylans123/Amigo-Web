const db = require('../database');
const jwt = require('jsonwebtoken');

// Generate information for admin dashboard
getDashboardMetrics = (request, response) => {
    const requestQuery = request.query;

	const query = `
        SELECT  (
            SELECT COUNT(*)
            FROM   users
            ) AS user_count,
            (
            SELECT COUNT(*)
            FROM   channels
            ) AS channel_count,
            (
            SELECT COUNT(*)
            FROM   direct_messages
            ) AS direct_message_count,
            (
            SELECT COUNT(*)
            FROM   channel_messages
            ) AS channel_message_count
	`;

	db.client
		.query(query)
		.then(result => {
			response.status(200).json({'success': true, 'result': result.rows});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
}

module.exports = {
    getDashboardMetrics
}