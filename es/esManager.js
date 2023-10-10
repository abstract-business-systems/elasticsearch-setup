const { Client } = require("@elastic/elasticsearch");
const { mapAsync } = require("../utils");
const products = require("./products.json");

const bulkUpdate = async ({ client }) => {
  try {
    await mapAsync(products, async (product) => {
      await client.index({
        index: "products",
        body: product,
      });
      console.log("posted");
    });
  } catch (error) {
    console.error(`Error posting products: ${error}`);
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
      console.log(`Index created: ${indexName}`);
      console.log(response);
    } catch (error) {
      console.error(`Error creating index: ${error}`);
    }
  });
};

const connectToEs = (url) => new Client({ node: url });

const deleteIndex = async ({ client, indexName }) => {
  try {
    const response = await client.indices.delete({ index: indexName });
    console.log(`Index deleted: ${indexName}`);
    console.log(response);
  } catch (error) {
    console.error(`Error deleting index: ${error}`);
  }
};

const searchData = async ({ client, body }) => {
  try {
    const response = await client.search({
      index: "productsmyql", // Replace with your index name
      body: body,
    });

    const documents = response.hits.hits;
    console.log(documents);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  bulkUpdate,
  createIndex,
  connectToEs,
  deleteIndex,
  searchData,
};
