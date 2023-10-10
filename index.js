const schema = require('./es/schema');
const { connectToEs, createIndex, bulkUpdate } = require('./es/esManageresManager');

const main = async (context) => {
  const client = await connectToEs('http://localhost:9200');
  const extendedContext = { ...context, client };
  await createIndex(extendedContext);
  await bulkUpdate(extendedContext);
};

main({
  schema,
});