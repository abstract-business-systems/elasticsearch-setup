const { peek } = require('@laufire/utils/debug');
const { mapAsync } = require('../utils');

module.exports = {
	init: async (sequelize) => {
		try {
			await sequelize.authenticate();
			peek('Connected to the database.');
			await sequelize.sync({ force: true });
		}
		catch (error) {
			peek('Unable to connect to the database:', error);
		}
	},
	insertRecords: async (Table, records) => {
		try {
			await mapAsync(records, async (record) => {
				peek(await Table.create(record));
			});
		}
		catch (error) {
			peek('Error creating Product:', error);
		}
	},
};
