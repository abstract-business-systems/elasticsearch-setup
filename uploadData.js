const { mapAsync } = require("./utils");
const data = require("./data.json");

const bulkUpdate = async ({ client }) => {
  await mapAsync(data, async (coll, indexName) => {
    try {
        mapAsync(coll, async (data) => {
            await client.index({
                index: indexName,
                body: data,
            });
            console.log('posted');
        })
    } catch (error) {
        console.error(`Error posting products: ${error}`);
    }
  })
};

module.exports = bulkUpdate;
