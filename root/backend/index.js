const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const {check, validationResult} = require('express-validator');
const server = require('http').Server(app);
const io = require('./websocket').initialize(server);
const db = require('./database');
const users = require('./controllers/users');
const tags = require('./controllers/tags');
const channels = require('./controllers/channels');
const messages = require('./controllers/messages');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

io.on('connection', () => {
	console.log('A user is connected.');
});

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
app.get('/api/:tag_id/channels', users.validateUser, channels.getChannelsByTag);
app.get('/api/tags/all', users.validateUser, tags.getTags);
app.get('/api/tags', users.validateUser, tags.getUserTags);
app.get('/api/:channel_id/messages', users.validateUser, messages.getMessages);
app.post('/api/messages', users.validateUser, messages.sendMessage);
app.post('/api/tags', users.validateAdminUser, tags.createTag);

// Code to generate frontend build directory
var arr = __dirname.split('/');
arr.pop();
arr.push('frontend');
arr.push('dist');
const dir = arr.join('/');
app.use(express.static(dir));
app.get("/*", (req, res) => {
	res.sendFile(path.join(dir, "/index.html"));
});

server.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});