const yup = require('yup');

const addNoteSchema = yup.object().shape({
	title: yup.string().trim().max(20).required(),
	content: yup.string().trim().max(300).required(),
});

const updateNoteSchema = yup.object().shape({
	id: yup.string().required(),
	title: yup.string().trim().max(20).required(),
	content: yup.string().trim().max(300).required(),
});

const deleteNoteSchema = yup.object().shape({
	id: yup.string().required(),
});

module.exports = { addNoteSchema, updateNoteSchema, deleteNoteSchema };
