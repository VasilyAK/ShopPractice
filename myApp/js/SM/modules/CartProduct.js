import CommonMethods from './CommonMethods.js';

export default class CartProduct extends CommonMethods {
	constructor (options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE') {
			this.id = CartProduct.newProperty(options, 'id', 0, 'number');
			this.product = CartProduct.newProperty(options, 'product', undefined, 'object');
			this.quantity = CartProduct.newProperty(options, 'quantity', 1, 'number')
		} else {
			Object.defineProperties(this, {
				'id': {
					value: CartProduct.newProperty(options, 'id', 0, 'number'),
					configurable: false,
					enumerable: true,
					writable: true
				},

				'product': {
					value: CartProduct.newProperty(options, 'product', undefined, 'object'),
					configurable: false,
					enumerable: true,
					writable: true
				},

				'quantity': {
					value: CartProduct.newProperty(options, 'quantity', 1, 'number'),
					configurable: false,
					enumerable: true,
					writable: true
				}
			})
		}
	}
}