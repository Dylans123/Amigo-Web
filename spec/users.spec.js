const axios = require('axios');
const db = require('../database');
const serverURL = process.env['SERVER_URL'];

describe("Users Tests", () => {
	var server;
	var token;

	beforeAll((done) => {
		server = require("../index");

		const requestBody = {
			'email': process.env['TEST_USERNAME'],
			'password': process.env['TEST_PASSWORD']
		};

		axios.post('http://' + serverURL + '/api/login', requestBody)
			.then(response => {
				token = response.data['x-access-token'];
				done();
			})
			.catch(error => {
				data.status = error.response.status;
				done();
			});
	});

	describe("GET: /api/user", () => {
		const route = 'http://' + serverURL + '/api/user';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route, config)
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

		it("Status 400 - Using invalid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			axios.get(route, config)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(400);
					done();
				});
		});
	});

	describe("GET: /api/users", () => {
		const route = 'http://' + serverURL + '/api/users';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route, config)
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

		it("Status 400 - Using invalid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			axios.get(route, config)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(400);
					done();
				});
		});
	});
});