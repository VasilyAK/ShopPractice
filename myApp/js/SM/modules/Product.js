import CommonMethods from './CommonMethods.js';

export default class Product extends CommonMethods {
	constructor(options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE'){
			for (let i in options) {
				this[i] = options[i];
			}
		} else {
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
}