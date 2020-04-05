// Restrict image file types
const imageFilter = function(request, file, next) {
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		request.fileValidationError = 'Only image files are allowed.';
		return next("", false);
	}

	next(null, true);
};

exports.imageFilter = imageFilter;