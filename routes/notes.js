const express = require('express');
const router = express.Router();
const {
	getAllNotesController,
	getNoteByIdController,
	addNoteController,
	updateNoteController,
	deleteNoteController,
} = require('../controllers/notes');
const validation = require('../middleware/validation');
const {
	addNoteSchema,
	updateNoteSchema,
	deleteNoteSchema,
} = require('../validation/noteValidation');

/**
 * @swagger
 * definitions:
 *   Note:
 *     type: object
 *     properties:
 *       noteId:
 *         type: string
 *         example: "1234"
 *       title:
 *         type: string
 *         example: "My note"
 *       content:
 *         type: string
 *         example: "This is the content of my note"
 *       createdAt:
 *         type: string
 *         example: "2022-04-08T12:00:00Z"
 *       updatedAt:
 *         type: string
 *         example: "2022-04-08T13:00:00Z"
 */

/**
 * @swagger
 * /dev/notes:
 *   get:
 *     summary: Retrieve all notes
 *     description: Retrieve a list of all notes stored in the database
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of notes
 *         schema:
 *           type: array
 *           items:
 *            $ref: '#/definitions/Note'
 *       404:
 *         description: No notes found in the database
 */

router.get('/', getAllNotesController);

/**
 * @swagger
 * /dev/notes/{id}:
 *   get:
 *     summary: Retrieve a single note by ID
 *     description: Retrieve a single note from the database by ID
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single note object
 *         schema:
 *           items:
 *            $ref: '#/definitions/Note'
 *       404:
 *         description: Note not found in the database
 */

router.get('/:id', getNoteByIdController);

/**
 * @swagger
 * /dev/notes:
 *   post:
 *     summary: Add a new note
 *     description: Add a new note to the database
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: note
 *         in: body
 *         description: Created note object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "New title"
 *             content:
 *               type: string
 *               example: "This is the content of my note"
 *           required:
 *             - title
 *             - content
 *           additionalProperties: false
 *     responses:
 *       201:
 *         description: The newly created note
 *         schema:
 *           items:
 *            $ref: '#/definitions/Note'
 *       400:
 *         description: Invalid request body
 */

router.post('/', validation(addNoteSchema), addNoteController);

/**
 * @swagger
 * /dev/notes/{id}:
 *   put:
 *     summary: Update a note
 *     description: Update a note with the specified ID
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to update
 *         required: true
 *         schema:
 *           type: string
 *         example: "1234"
 *       - name: note
 *         in: body
 *         description: Updated note object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "New title"
 *             content:
 *               type: string
 *               example: "This is the content of my note"
 *           required:
 *             - title
 *             - content
 *           additionalProperties: false
 *     responses:
 *       200:
 *         description: The updated note
 *         schema:
 *           items:
 *            $ref: '#/definitions/Note'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Note not found
 */

router.put('/:id', validation(updateNoteSchema), updateNoteController);

/**
 * @swagger
 * /dev/notes/{id}:
 *   delete:
 *     summary: Delete a note by id
 *     description: Delete a note from the database by its ID.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the note to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           example: 1234
 *     responses:
 *       204:
 *         description: The note was deleted successfully.
 *       404:
 *         description: The note was not found.
 */

router.delete('/:id', validation(deleteNoteSchema), deleteNoteController);

module.exports = router;
