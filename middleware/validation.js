const validation = schema => async (req, res, next) => {
	const body = req.body;
	const query = req.params;

	try {
		await schema.validate({ ...body, ...query });
		next();
	} catch ({ errors }) {
		return res.status(400).json({ message: errors });
	}
};
module.exports = validation;
