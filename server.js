require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
	swaggerDefinition: {
		info: {
			title: 'Notes API',
			version: '1.0.0',
			description: 'API for managing notes',
			contact: {
				name: 'Pawel Oszywa',
				email: 'oszywapawel@gmail.com',
			},
		},
	},
	apis: ['./routes/notes.js'],
};

const swaggerSpec = swaggerJSDoc(options);
const notesRouter = require('./routes/notes');
const errorMiddleware = require('./middleware/error');

app.use(bodyParser.json());

app.use('/notes', notesRouter);
app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports.handler = serverless(app);
