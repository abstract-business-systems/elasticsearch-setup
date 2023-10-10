const { faker } = require('@faker-js/faker');

function generateRandomProduct() {
  const product = {
    product_id: faker.commerce.isbn(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  };
  return product;
}

const products = [];
for (let i = 0; i < 5; i++) {
  products.push(generateRandomProduct());
}

console.log(JSON.stringify(products, null, 2));
