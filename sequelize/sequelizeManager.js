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
    insertRecords: async (Table, records) => {
      try {
        await mapAsync(records, async (record) => {
            const newProduct = await Table.create(record);
        })
      } catch (error) {
        console.error('Error creating Product:', error);
      }
    }
};
