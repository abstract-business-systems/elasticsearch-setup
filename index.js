const { Client } = require('@elastic/elasticsearch');
const schema = require('./schema');
const createIndex = require('./createIndex');

const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch cluster URL
});

const main = async (context) => {
  await createIndex(context)
};

main({
  client,
  schema,
});