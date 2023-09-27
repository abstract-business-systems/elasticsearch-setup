const { mapAsync } = require('./utils');

const createIndex = async ({ client, schema }) => {
    await mapAsync(schema, async (props, indexName) => {
        try {
            const response = await client.indices.create({
                index: indexName,
                body: {
                    settings: {
                      number_of_shards: 1,
                      number_of_replicas: 1
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

module.exports = createIndex;