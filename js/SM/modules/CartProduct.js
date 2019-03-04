import ProductList from './ProductList.js';
import CommonMethods from './CommonMethods.js';

export default class CartProduct extends CommonMethods {
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'id': {
				value: ProductList.newProperty(options, 'id', 0, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'product': {
				value: ProductList.newProperty(options, 'product', undefined, 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'quantity': {
				value: ProductList.newProperty(options, 'quantity', 1, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			}
		})
	}
}