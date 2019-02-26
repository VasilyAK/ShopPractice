import CommonMethods from './CommonMethods.js';

export default class Product extends CommonMethods {
	constructor(options) {
		super();
		Object.defineProperties(this, { //делаем все свойства неудаляемыми, неизменяемыми и перечисляемыми можно тоже самое сделать при помощи
			// freeze, но тут более гибкая настройка, поэтому пока что оставлю ее
			'title': {
				value: Product.newProperty(options, 'title', undefined),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'price': {
				value: Product.newProperty(options, 'price', 0, 'number'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'image': {
				value: Product.newProperty(options, 'image', undefined),
				configurable: false,
				enumerable: true,
				writable: false
			}
		})
	}

	declare(options) {
		for (let i in options) {
			Object.defineProperty(this,
				Product.newProperty(options, options['name'], undefined),
				{
					configurable: false,
					enumerable: true,
					writable: false
				}
			)
		}
	}
}