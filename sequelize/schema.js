const { DataTypes } = require('sequelize');

const productSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	product_id: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		// eslint-disable-next-line no-magic-numbers
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

module.exports = productSchema;
