const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../keys.json');
const {Storage} = Cloud;

const storage = new Storage({
	keyFilename: serviceKey,
	projectId: 'Your Project ID'
});

const util = require('util');
const bucket = storage.bucket('amigo-bucket');

const upload = async (request, response, next) => {
	try {
		const myFile = request.file;
		const imageURL = await uploadImage(myFile);
		response.status(200).json({'success': true, 'message': 'Upload was successful.', 'image_url': imageURL});
	}
	catch (error) {
		next(error);
	}
};

const uploadImage = (file) => new Promise((resolve, reject) => {
	const {originalname, buffer} = file;
	const blob = bucket.file(originalname.replace(/ /g, "_"));
	const blobStream = blob.createWriteStream({resumable: false});

	blobStream
		.on('finish', () => {
			const publicURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
			resolve(publicURL);
		})
		.on('error', () => {
			reject(`Unable to upload image, something went wrong.`)
		})
		.end(buffer)
});

module.exports = {
	upload
};