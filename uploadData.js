const { mapAsync } = require("./utils");
const products = require("./products.json");

const bulkUpdate = async ({ client }) => {
    try {
      await mapAsync(products, async (product) => {
            await client.index({
                index: 'products',
                body: product,
            });
            console.log('posted');
        })
    } catch (error) {
        console.error(`Error posting products: ${error}`);
    }
};

module.exports = bulkUpdate;
