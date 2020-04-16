const axios = require('axios');
const db = require('../database');
const serverURL = process.env['SERVER_URL'];

describe("Schools Tests", () => {
	var server;
	var token;

	beforeAll((done) => {
		server = require("../index");

		const requestBody = {
			'email': process.env['TEST_USERNAME'],
			'password': process.env['TEST_PASSWORD']
		};

		axios.post(serverURL + '/api/login', requestBody)
			.then(response => {
				token = response.data['x-access-token'];
				done();
			})
			.catch(error => {
				data.status = error.response.status;
				done();
			});
	});

	describe("GET: /api/schools", () => {
		const route = serverURL + '/api/schools';

		it("Status 200", (done) => {
			var data = {};

			axios.get(route)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(200);
					done();
				});
		});
	});
});