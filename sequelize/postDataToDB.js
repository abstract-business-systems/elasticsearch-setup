const { Sequelize } = require("sequelize");
const { mapAsync } = require("../utils");
const { init, insertRecords } = require("./sequelizeManager");
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
    await insertRecords(Table, initialData);
  });
};

main(config);
