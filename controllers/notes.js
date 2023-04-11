const {
	getAllNotes,
	getNoteById,
	addNote,
	updateNote,
	deleteNote,
} = require('../models/notes');
const { v4: uuidv4 } = require('uuid');

const getAllNotesController = async (_req, res, next) => {
	try {
		const notes = await getAllNotes();
		res.json(notes);
	} catch (err) {
		next(err);
	}
};

const getNoteByIdController = async (req, res, next) => {
	try {
		const note = await getNoteById(req.params.id);
		res.json(note);
	} catch (err) {
		next(err);
	}
};

const addNoteController = async (req, res, next) => {
	try {
		const { title, content } = req.body;
		const note = {
			noteId: uuidv4(),
			title,
			content,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		await addNote(note);
		res.json(note);
	} catch (err) {
		next(err);
	}
};

const updateNoteController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const note = req.body;
		const { createdAt } = await getNoteById(id);
		const updatedNote = { ...note, updatedAt: new Date().toISOString() };
		const result = await updateNote(id, updatedNote);
		res.json({ ...result, id, createdAt });
	} catch (err) {
		next(err);
	}
};

const deleteNoteController = async (req, res, next) => {
	try {
		const { id } = req.params;
		await getNoteById(id);
		await deleteNote(id);
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addNoteController,
	getAllNotesController,
	getNoteByIdController,
	updateNoteController,
	deleteNoteController,
};
