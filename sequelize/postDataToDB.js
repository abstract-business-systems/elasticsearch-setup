const { Sequelize } = require("sequelize");
const { mapAsync } = require("../utils");
const { init, createProduct } = require("./sequelizeManager");
const config = require('../core/config');

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

main(config);
