const errorMiddleware = (err, _req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).json({ message });
	next(err);
};

module.exports = errorMiddleware;
