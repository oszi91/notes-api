const AWS = require('aws-sdk');

AWS.config.update({
	region: process.env.REGION,
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'notes';

const getAllNotes = async () => {
	const params = {
		TableName: TABLE_NAME,
	};
	const notes = await dynamoClient.scan(params).promise();
	if (notes.Count === 0) {
		throw { message: 'No notes found', statusCode: 404 };
	}
	return notes;
};

const getNoteById = async id => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			noteId: id,
		},
	};

	const data = await dynamoClient.get(params).promise();
	if (!data.Item) {
		throw { message: 'Note not found', statusCode: 404 };
	}
	return data.Item;
};

const addNote = async note => {
	const params = {
		TableName: TABLE_NAME,
		Item: note,
	};

	await dynamoClient.put(params).promise();
};

const updateNote = async (id, note) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			noteId: id,
		},
		UpdateExpression:
			'set #title = :title, #content = :content, #updatedAt = :updatedAt',
		ExpressionAttributeValues: {
			':title': note.title,
			':content': note.content,
			':updatedAt': new Date().toISOString(),
		},
		ExpressionAttributeNames: {
			'#title': 'title',
			'#content': 'content',
			'#updatedAt': 'updatedAt',
		},
		ReturnValues: 'UPDATED_NEW',
	};

	const result = await dynamoClient.update(params).promise();
	return result.Attributes;
};

const deleteNote = async id => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			noteId: id,
		},
	};

	await dynamoClient.delete(params).promise();
};

module.exports = {
	addNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
};
