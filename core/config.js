require('dotenv').config();
const productSchema = require('../sequelize/schema');
const products = require('../es/products.json')

module.exports = [
  {
    db: "elasticsearch",
    userName: process.env.MYSQL_USER,
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
    userName: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    setup: {
      host: "localhost",
      dialect: "postgres",
      port: 5431,
    },
    tableName: "product",
    schema: productSchema,
    initialData: products,
  },
];
