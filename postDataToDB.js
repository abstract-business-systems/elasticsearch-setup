require('dotenv').config();
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");
const products = require("./es/products");
const { mapAsync } = require("./utils");
const { init, createProduct } = require("./sequelizeManager");

const productSchema = {
  // Define your fields here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.STRING, // Assuming "product_id" is a string
    unique: true, // Assuming it should be unique
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
    type: DataTypes.DECIMAL(10, 2), // Assuming "price" is a decimal with 2 decimal places
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const main = async (dbConfig) => {
  await mapAsync(dbConfig, async (config) => {
    const { db, userName, password, setup } = config;
    const { tableName, schema, initialData } = config;
    const sequelize = new Sequelize(
      db,
      userName,
      password,
      setup,
    );

    const Table = sequelize.define(tableName, schema);
    await init(sequelize);
    await createProduct(Table, initialData);
  });
};

main([
  {
    db: "elasticsearch",
    userName: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    setup: {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    },
    tableName: "product",
    schema: productSchema,
    initialData: products,
  },
  {
    db: "elasticsearch",
    userName: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    setup: {
      host: "localhost",
      dialect: "postgres",
      port: 5432,
    },
    tableName: "product",
    schema: productSchema,
    initialData: products,
  },
]);
