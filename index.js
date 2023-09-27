const { Client } = require('@elastic/elasticsearch');
const schema = require('./schema');
const createIndex = require('./createIndex');
const bulkUpdate = require('./uploadData');

const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch cluster URL
});

const main = async (context) => {
  await createIndex(context);
  await bulkUpdate(context);
};

main({
  client,
  schema,
});