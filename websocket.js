var sio = require('socket.io');
var io = null;

exports.io = () => {
	return io;
};

exports.initialize = (server) => {
	return io = sio(server);
};