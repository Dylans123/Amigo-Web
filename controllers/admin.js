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
			response.status(200).json({'success': true, 'metrics': result.rows[0]});
		})
		.catch(error => {
			response.status(400).json({'success': false, 'message': error.toString()});
		});
}

getMessageInfo = (request, response) => {
    const requestQuery = request.query;

    const query = `
        SELECT message_id, created_on
        FROM channel_messages
        UNION
        SELECT message_id, created_on::timestamp with time zone at time zone 'Etc/UTC' as direct_created_on
        FROM direct_messages
        ORDER BY created_on ASC
    `

    db.client
        .query(query)
        .then(result => {
            console.log(result)
            response.status(200).json({'success': true, 'messages': result.rows});
        })
        .catch(error => {
            response.status(400).json({'success': false, 'message': error.toString()});
        });
}

module.exports = {
    getDashboardMetrics,
    getMessageInfo
}