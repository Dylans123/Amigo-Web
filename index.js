const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
const path = require('path');
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
const uploadImage = require('./images.js');

const multerMid = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
})
  
app.disable('x-powered-by')
app.use(multerMid.single('file'))
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

	socket.on('leave', (data) => {
		leaveRoom(socket, data);
	})
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
		if (parseInt(payload.user_id) <= parseInt(data.receiver_user_id)) {
			socket.join(payload.user_id + ":" + data.receiver_user_id);
		} else {
			socket.join(data.receiver_user_id + ":" + payload.user_id);
		}
	}
}

function leaveRoom(socket, data) {
	if (!(data.channel_id === undefined))
		socket.leave(data.channel_id);
	else if (!(data.receiver_user_id === undefined))
		socket.leave(payload.user_id + ":" + data.receiver_user_id);
}

// Registration and login routes
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

app.post(
	'/api/admin/login',
	[
		check('email').not().isEmpty().withMessage("Username is missing."),
		check('password').not().isEmpty().withMessage("Password is missing.")
	],
	users.adminLogin
);

app.get('/verify', users.verifyEmail);
app.get('/api/sendverification', users.sendVerification);

// User routes
app.get('/api/user', users.validateUser, users.getUserInfo);
app.get('/api/user/search', users.validateUser, users.searchUser);

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

// Channel routes
app.get('/api/user/channels', users.validateUser, channels.getUserChannels);
app.get('/api/channels', users.validateUser, channels.getChannels);
app.post('/api/channels', users.validateUser, channels.createChannel);
app.post('/api/channels/join', users.validateUser, channels.joinChannel);
app.post('/api/channels/leave', users.validateUser, channels.leaveChannel);
app.get('/api/channels/users', users.validateUser, channels.getChannelUsers);
app.post('/api/channels/users/remove', users.validateUser, channels.removeChannelUser);
app.get('/api/channels/membercount', users.validateUser, channels.getChannelMemberCount);
app.get('/api/channels/messages', users.validateUser, messages.getMessages);
app.post('/api/channels/messages', users.validateUser, messages.sendMessage);

// Tag routes
app.get('/api/tags', users.validateUser, tags.getTags);
app.get('/api/user/tags', users.validateUser, tags.getUserTags);
app.post('/api/tags', users.validateAdminUser, tags.createTag);

// Direct message routes
app.get('/api/directmessages', users.validateUser, messages.getDirectMessages);
app.post('/api/directmessages', users.validateUser, messages.sendDirectMessage);
app.get('/api/directmessages/receivers', users.validateUser, messages.getDirectMessageReceivers);

// School routes
app.get('/api/schools', users.validateUser, schools.getSchools);

// Code to generate frontend build directory
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Storage API
app.post('/api/uploads', async (req, res, next) => {
	try {
		const myFile = req.file
		const imageUrl = await uploadImage(myFile);
		res
			.status(200)
			.json({
			message: "Upload was successful",
			data: imageUrl
		})
	} catch (error) {
		next(error)
	}
});

app.use((err, req, res, next) => {
	res.status(500).json({
		error: err,
		message: 'Internal server error!',
	})
	next()
});

server.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});