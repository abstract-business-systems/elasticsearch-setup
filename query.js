require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const { searchData } = require('./es/esManager.js');

// Create an Elasticsearch client
const client = new Client({ node: `http://localhost:${ process.env.ELASTICSEARCH_PORT }` });

searchData({
	client: client,
	body: {
		query: {
			match_all: {},
		},
	},
});
