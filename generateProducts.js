const { faker } = require('@faker-js/faker');

// Function to generate random product data
function generateRandomProduct() {
  const product = {
    product_id: faker.commerce.isbn(), // Generates a random number between 0 and 99999
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  };
  return product;
}

// Generate an array of 5 random products
const products = [];
for (let i = 0; i < 5; i++) {
  products.push(generateRandomProduct());
}

console.log(JSON.stringify(products, null, 2));
