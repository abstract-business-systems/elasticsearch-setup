const { mapAsync } = require("../utils");

module.exports = {
    init: async (sequelize) => {
        try {
          await sequelize.authenticate();
          console.log('Connected to the database.');
      
          // Synchronize the models with the database
          await sequelize.sync({ force: true }); // Set force to true to drop and re-create tables
        } catch (error) {
          console.error('Unable to connect to the database:', error);
        }
    },
    createProduct: async (Product, products) => {
      try {
        await mapAsync(products, async (product) => {
            const newProduct = await Product.create(product);
            console.log('Product created:', newProduct.toJSON());
        })
      } catch (error) {
        console.error('Error creating Product:', error);
      }
    }
};
