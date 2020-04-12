const axios = require('axios');
const db = require('../database');
const serverURL = process.env['SERVER_URL'];

describe("Channels Tests", () => {
	var server;
	var token;

	beforeAll((done) => {
		console.log("\n");
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

	describe("GET: /api/user/channels", () => {
		const route = 'http://' + serverURL + '/api/user/channels';

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

	describe("GET: /api/channels/users", () => {
		const route = 'http://' + serverURL + '/api/channels/users';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route + '?channel_id=1', config)
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

			axios.get(route + '?channel_id=1', config)
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

	describe("GET: /api/channels", () => {
		const route = 'http://' + serverURL + '/api/channels';

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

		it("Status 400 - Using valid token. Using invalid parameters.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			axios.get(route + '?exact=true', config)
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

	describe("GET: /api/channels/messages", () => {
		const route = 'http://' + serverURL + '/api/channels/messages';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route + '?channel_id=101', config)
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

			axios.get(route + '?channel_id=101', config)
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

		it("Status 400 - Have not joined channel yet.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route + '?channel_id=500000', config)
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

	describe("GET: /api/channel", () => {
		const route = 'http://' + serverURL + '/api/channel';

		it("Status 200 - Using valid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			axios.get(route + '?channel_id=1', config)
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

			axios.get(route + '?channel_id=1', config)
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

		it("Status 400 - Channel does not exist.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			axios.get(route + '?channel_id=500000', config)
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

	describe("POST: /api/channels/join", () => {
		const route = 'http://' + serverURL + '/api/channels/join';

		it("Status 200 - Using valid token. Joining new channel.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '107'
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

					axios.post('http://' + serverURL + '/api/channels/leave', requestBody, config)
						.finally(() => {
							done();
						});
				});
		});

		it("Status 400 - Using invalid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			const requestBody = {
				'channel_id': '107'
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

		it("Status 400 - Using valid token. Joining channel already joined.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '101'
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

		it("Status 400 - Using valid token. Missing channel_id in request body.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {};

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

	describe("POST: /api/channels/leave", () => {
		const route = 'http://' + serverURL + '/api/channels/leave';

		it("Status 200 - Using valid token. Leaving joined channel.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '107'
			};

			axios.post('http://' + serverURL + '/api/channels/join', requestBody, config)
				.finally(() => {
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
		});

		it("Status 400 - Using invalid token.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': '123.456.789'}};

			const requestBody = {
				'channel_id': '107'
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

		it("Status 400 - Using valid token. Leaving channel not joined yet.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '107'
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

		it("Status 400 - Using valid token. Missing channel_id in request body.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {};

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

	describe("POST: /api/channels/messages", () => {
		const route = 'http://' + serverURL + '/api/channels/messages';

		it("Status 200 - Using valid token. Sending message in joined channel.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '1',
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
				'channel_id': '1',
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

		it("Status 400 - Using valid token. Sending message in channel not joined yet.", (done) => {
			var data = {};
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '5',
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
			var config = {headers: {'x-access-token': token}};

			const requestBody = {
				'channel_id': '5',
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