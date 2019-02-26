import ProductList from './ProductList.js';
import CommonMethods from './CommonMethods.js';

export default class CartProduct extends CommonMethods {
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'position': {
				value: ProductList.newProperty(options, 'position', 0, 'number'),
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

			'number': {
				value: ProductList.newProperty(options, 'number', 1, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'cost': {
				enumerable: true,
				get: function () {
					if (this.product){
						return this.product.price * this.number
					}
					return 0
				}
			}
		})
	}
}