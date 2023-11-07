require('dotenv').config();
const schema = require('./es/schema');
const { connectToEs, createIndex, bulkUpdate } = require('./es/esManager');

const main = async (context) => {
  const client = await connectToEs(`http://localhost:${process.env.ELASTICSEARCH_PORT}`);
  const extendedContext = { ...context, client };
  await createIndex(extendedContext);
  await bulkUpdate(extendedContext);
};

main({
  schema,
});
