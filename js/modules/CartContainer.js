import CommonMethods from './CommonMethods.js';
import Cart from './Cart.js';

export default class CartContainer extends CommonMethods { // содержит все созданные carts
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: CartContainer.newProperty(options, 'name', 'cartContainer'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'item': {
				value: CartContainer.newProperty(options, 'item', [], 'object'),
				configurable: false,
				enumerable: true,
			}
		})
	}

	createCart (cart) {
		if (cart instanceof Cart) {
			if (cart.name) {
				for (let i in this.item) {
					if (this.item.name === cart.name) {
						console.log(new Error (`${cart.name} is already in ${this.name}`));
						return;
					}
				}
				this.item.push(cart);
				Object.preventExtensions(cart); // запрещаем добавлять новые элементы
				return this.item[this.item.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "Cart"`)
		}
	}
}