const axios = require('axios');
const db = require('../database');
const serverURL = process.env['SERVER_URL'];

describe("Registration/Login Tests", () => {
	var server;

	beforeAll((done) => {
		server = require("../index");
		done();
	});

	describe("POST /api/login", () => {
		const route = serverURL + '/api/login';

		it("Status 200 - Using valid credentials.", (done) => {
			var data = {};

			const requestBody = {
				'email': process.env['TEST_USERNAME'],
				'password': process.env['TEST_PASSWORD']
			};

			axios.post(route, requestBody)
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

		it("Status 401 - Using invalid credentials.", (done) => {
			var data = {};
			
			const requestBody = {
				'email': 'test@knights.ucf.edu',
				'password': 'test'
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(401);
					done();
				});
		});

		it("Status 422 - Missing email in request body.", (done) => {
			var data = {};
			
			const requestBody = {
				'password': 'test'
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});
	});

	describe("POST /api/signup", () => {
		const route = serverURL + '/api/signup';

		it("Status 422 - Missing fields.", (done) => {
			var data = {};
			
			const requestBody = {
				"email": "test@knights.ucf.edu",
				"password": "password",
				"confirmation_password": "password",
				"last_name": "Last",
				"display_name": "Name",
				"school_id": "1"
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});

		it("Status 422 - Password less than 6 characters.", (done) => {
			var data = {};
			
			const requestBody = {
				"email": "test@knights.ucf.edu",
				"password": "123",
				"confirmation_password": "123",
				"first_name": "First",
				"last_name": "Last",
				"display_name": "Name",
				"school_id": "1"
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});
		
		it("Status 422 - Passwords do not match.", (done) => {
			var data = {};
			
			const requestBody = {
				"email": "test@knights.ucf.edu",
				"password": "password123",
				"confirmation_password": "password456",
				"first_name": "First",
				"last_name": "Last",
				"display_name": "Name",
				"school_id": "1"
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});

		it("Status 422 - Display name less than 4 characters.", (done) => {
			var data = {};
			
			const requestBody = {
				"email": "test@knights.ucf.edu",
				"password": "password",
				"confirmation_password": "password",
				"first_name": "First",
				"last_name": "Last",
				"display_name": "ABC",
				"school_id": "1"
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});

		it("Status 422 - Invalid email.", (done) => {
			var data = {};
			
			const requestBody = {
				"email": "test",
				"password": "password",
				"confirmation_password": "password",
				"first_name": "First",
				"last_name": "Last",
				"display_name": "Name",
				"school_id": "1"
			};

			axios.post(route, requestBody)
				.then(response => {
					data.status = response.status;
				})
				.catch(error => {
					data.status = error.response.status;
				})
				.finally(() => {
					expect(data.status).toBe(422);
					done();
				});
		});
	});
});