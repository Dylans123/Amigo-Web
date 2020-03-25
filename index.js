const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const {check, validationResult} = require('express-validator');
const server = require('http').Server(app);
const io = require('./websocket').initialize(server);
const jwt = require('jsonwebtoken');
const db = require('./database');
const users = require('./controllers/users');
const tags = require('./controllers/tags');
const channels = require('./controllers/channels');
const messages = require('./controllers/messages');
const schools = require('./controllers/schools');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Socket connections
const key = process.env['JWT_KEY'];
const adminKey = process.env['JWT_ADMIN_KEY'];

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		jwt.verify(data.token, key, (error, decoded) => {
			if (error) {
				jwt.verify(data.token, adminKey, (error, decoded) => {
					if (!error)
						joinRoom(socket, data);
				});
			}
			else {
				joinRoom(socket, data);
			}
		});
	});
});

function joinRoom(socket, data) {
	const payload = jwt.decode(data.token);

	if (!(data.channel_id === undefined)) {
		channels.checkChannelJoin(payload.user_id, data.channel_id, hasJoinedChannel =>
		{
			if (hasJoinedChannel)
				socket.join(data.channel_id);
		});
	}
	else if (!(data.receiver_user_id === undefined)) {
		socket.join(payload.user_id + ":" + data.receiver_user_id);
	}
}

// Routes
app.post(
	'/api/signup',
	[
		check('email')
			.isEmail().withMessage('Email is invalid.')
			.custom(value => {
				return new Promise((resolve, reject) => {
					users.checkEmail(value, taken => {
						if (taken) {
							reject(new Error('Email already registered.'));
						}
						else {
							resolve(true);
						}
					});
				});
			}),
		check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters.'),
		check('confirmation_password').custom((value, {req}) => (value === req.body.password)).withMessage('Passwords do not match.'),
		check('first_name').isAlpha().withMessage('First name is invalid.'),
		check('last_name').isAlpha().withMessage('Last name is invalid.'),
		check('display_name')
			.isAlphanumeric().withMessage("Display name is not valid.")
			.isLength({min: 3}).withMessage('Display name must be at least 3 characters.')
	],
	users.signup
);

app.post(
	'/api/login',
	[
		check('email').not().isEmpty().withMessage("Username is missing."),
		check('password').not().isEmpty().withMessage("Password is missing.")
	],
	users.login
);

app.get('/verify', users.verifyEmail);
app.get('/api/sendverification', users.sendVerification);
app.get('/api/user', users.validateUser, users.getUserInfo);
app.get('/api/channels', users.validateUser, channels.getUserChannels);
app.post('/api/channels', users.validateUser, channels.createChannel);
app.post('/api/join', users.validateUser, channels.joinChannel);
app.post('/api/leave', users.validateUser, channels.leaveChannel);
app.get('/api/channels/:tag_id', users.validateUser, channels.getChannelsByTag);
app.get('/api/channels/:school_id/:tag_id', users.validateUser, channels.getChannelsByTagAndSchool);
app.get('/api/channels/:channel_id/count', users.validateUser, channels.getChannelMemberCount);
app.get('/api/searchchannels', users.validateUser, channels.searchChannels);
app.get('/api/tags/all', users.validateUser, tags.getTags);
app.get('/api/tags', users.validateUser, tags.getUserTags);
app.get('/api/tags/:school_id', users.validateUser, tags.getTagsBySchool);
app.get('/api/searchtags', users.validateUser, tags.searchTags);
app.get('/api/messages/:channel_id', users.validateUser, messages.getMessages);
app.post('/api/messages', users.validateUser, messages.sendMessage);
app.get('/api/directmessages/:receiver_user_id', users.validateUser, messages.getDirectMessages);
app.post('/api/directmessages', users.validateUser, messages.sendDirectMessage);
app.get('/api/directmessages/receivers', users.validateUser, messages.getDirectMessageUsers);
app.get('/api/schools/:school_id', users.validateUser, schools.getSchoolByID);
app.get('/api/schools', users.validateUser, schools.getSchools);
app.get('/api/searchschools', users.validateUser, schools.searchSchools);
app.post('/api/tags', users.validateAdminUser, tags.createTag);

app.post(
	'/api/user',
	[
		check('password').not().isEmpty().withMessage("Must provide password to update."),
		check('new_password').optional().isLength({min: 6}).withMessage('Password must be at least 6 characters.'),
		check('confirmation_new_password').custom((value, {req}) => (value === req.body.new_password)).withMessage('Passwords do not match.'),
		check('first_name').isAlpha().withMessage('First name is invalid.'),
		check('last_name').isAlpha().withMessage('Last name is invalid.'),
		check('display_name')
			.isAlphanumeric().withMessage("Display name is not valid.")
			.isLength({min: 3}).withMessage('Display name must be at least 3 characters.')
	],
	users.validateUser,
	users.updateUser
);

// Code to generate frontend build directory
console.log(__dirname);
app.use(express.static(__dirname + "/frontend/dist"));
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

server.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});