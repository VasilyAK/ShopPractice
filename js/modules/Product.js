import CommonMethods from './CommonMethods.js';

export default class Product extends CommonMethods {
	constructor(options) {
		super();

		for (let i in options) {
			Object.defineProperty(this, i,
				{
					value: Product.newProperty(options, i, undefined),
					configurable: false,
					enumerable: true,
					writable: false
				}
			)
		}
	}
}