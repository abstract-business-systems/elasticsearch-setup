/* eslint-disable no-magic-numbers */
const { faker } = require('@faker-js/faker');
const { peek } = require('@laufire/utils/debug');

const generateRandomProduct = () => {
	const product = {
		product_id: faker.commerce.isbn(),
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		category: faker.commerce.department(),
	};

	return product;
};

const products = [];

for(let i = 0; i < 5; i++)
	products.push(generateRandomProduct());

peek(JSON.stringify(
	products, null, 2,
));
