const products = {
	product_id: {
		type: 'keyword',
	},
	name: {
		type: 'text',
	},
	description: {
		type: 'text',
	},
	price: {
		type: 'float',
	},
	category: {
		type: 'keyword',
	},
};

module.exports = { products };
