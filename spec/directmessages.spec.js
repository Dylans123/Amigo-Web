const axios = require('axios');
const db = require('../database');
const serverURL = process.env['SERVER_URL'];

describe("Messages Tests", () => {
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

	describe("GET: /api/directmessages", () => {
		const route = 'http://' + serverURL + '/api/directmessages';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route + '?receiver_user_id=10', config)
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

			axios.get(route + '?receiver_user_id=10', config)
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

	describe("GET: /api/directmessages/receivers", () => {
		const route = 'http://' + serverURL + '/api/directmessages/receivers';

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

	describe("POST: /api/directmessages", () => {
		const route = 'http://' + serverURL + '/api/directmessages';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'receiver_user_id': '10',
				'message': 'Hi'
			};

			axios.post(route, requestBody, config)
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

			const requestBody = {
				'receiver_user_id': '10',
				'message': 'Hi'
			};

			axios.post(route, requestBody, config)
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

		it("Status 400 - Using valid token. Missing message in request body.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			const requestBody = {
				'receiver_user_id': '10'
			};

			axios.post(route, requestBody, config)
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