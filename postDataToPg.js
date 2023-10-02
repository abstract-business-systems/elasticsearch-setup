const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const { mapAsync } = require('./utils');
const products = require('./products');

// Replace 'your_database_name', 'your_username', 'your_password', and 'your_host' with your database credentials.
const sequelize = new Sequelize('elasticsearch', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres', // The database dialect
  port: 5432, // The default PostgreSQL port
});

const Product = sequelize.define('product', {
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
  });

async function init() {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database.');
  
      // Synchronize the models with the database
      await sequelize.sync({ force: true }); // Set force to true to drop and re-create tables
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

async function createProduct() {
  try {
    await mapAsync(products, async (product) => {
        const newProduct = await Product.create(product);
        console.log('Product created:', newProduct.toJSON());
    })
  } catch (error) {
    console.error('Error creating Product:', error);
  }
}

const main = async () => {
    await init();
    await createProduct(); 
}

main();

