/* eslint-disable max-lines-per-function */
const { Client } = require('@elastic/elasticsearch');
const { mapAsync } = require('../utils');
const products = require('./products.json');
const peek = require('@laufire/utils/debug');

const bulkUpdate = async ({ client }) => {
	try {
		await mapAsync(products, async (product) => {
			await client.index({
				index: 'products',
				body: product,
			});
			peek('posted');
		});
	}
	catch (error) {
		peek(`Error posting products: ${ error }`);
	}
};

const createIndex = async ({ client, schema }) => {
	await mapAsync(schema, async (props, indexName) => {
		try {
			const response = await client.indices.create({
				index: indexName,
				body: {
					settings: {
						number_of_shards: 1,
						number_of_replicas: 1,
					},
					mappings: {
						properties: props,
					},
				},
			});

			peek(`Index created: ${ indexName }`);
			peek(response);
		}
		catch (error) {
			peek(`Error creating index: ${ error }`);
		}
	});
};

const connectToEs = (url) => new Client({ node: url });

const deleteIndex = async ({ client, indexName }) => {
	try {
		const response = await client.indices.delete({ index: indexName });

		peek(`Index deleted: ${ indexName }`);
		peek(response);
	}
	catch (error) {
		peek(`Error deleting index: ${ error }`);
	}
};

const searchData = async ({ client, body }) => {
	try {
		const response = await client.search({
			index: 'postgresproducts',
			body: body,
		});

		const documents = response.hits.hits;

		peek(documents);
	}
	catch (error) {
		peek(error);
	}
};

module.exports = {
	bulkUpdate,
	createIndex,
	connectToEs,
	deleteIndex,
	searchData,
};
