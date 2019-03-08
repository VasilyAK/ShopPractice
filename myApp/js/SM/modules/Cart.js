import CommonMethods from './CommonMethods.js';
import Product from './Product.js';
import CartProduct from './CartProduct.js';

export default class Cart extends CommonMethods {
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: Cart.newProperty(options, 'name', new Error('"name" is a required property'), 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'button': {
				value: Cart.newProperty(options, 'button', options['mod'] === 'VUE' ? undefined: new Error(`'button' is a required parameter`), 'object', Cart.checkWhere),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'items': {
				value: Cart.newProperty(options, 'items', [], 'object'),
				configurable: false,
				enumerable: true
			}
		})
	}

	vueSetOptions (product) { // для vue
		/*for (let i in this.items) {
			if (this.items.hasOwnProperty(i)) {
				if (this.items[i].product.identity(product)) { // если в корзине есть товар, добавляем его колличество
					return {
						index: i,
						value: new CartProduct ({
							id: this.items[i].id,
							product: product,
							quantity: this.items[i].quantity + 1
						})
					}
				}
			}
		}
		return {
			index: this.items.length,
			value: new CartProduct ({
				id: this.items.length,
				product: product,
				quantity: 1
			})
		}*/
		this.addCartProduct(product);
		return this;
	}

	addCartProduct (product) {
		if (product instanceof Product){
			for (let i in this.items) {
				if (this.items.hasOwnProperty(i)) {
					if (this.items[i].product.identity(product)) { // если в корзине есть товар, добавляем его колличество
						this.items[i].quantity++;
						return
					}
				}
			}

			this.items.push (new CartProduct ({
				id: this.items.length+1,
				product: product,
			}));
		} else {
			throw new Error(`New object is not a copy of "Product"`)
		}
	}

	removeCartProduct (position) {
		for (let i in this.items){
			if (this.items.hasOwnProperty(i)) {
				if (this.items.hasOwnProperty(i)) {
					if (this.items[i].position === position) {
						this.items.splice(i,1);
						rePos.call(this);
						return
					}
				}
			}
		}
		console.log (new Error(`${this.name} does not have product on position ${position}`));

		function rePos() {
			for (let i in this.items){
				if (this.items.hasOwnProperty(i)) {
					this.items[i].id = parseInt(i)+1;
				}
			}
		}
	}

	itemsCount () {
		return this.items.length
	}

	cost (id, price) {
		try {
			if (price && id && typeof id === 'number') {
				for (let item in this.items) {
					if (this.items.hasOwnProperty(item)) {
						if (item.id === id) {
							if (item.product[price] && typeof item.product[price] === 'number') {
								return item.product[price] * item.quantity
							} else {
								throw new Error('Method "cost" must have 2 parameters: id (number) - position of product in cart, price (number) - price of product in' +
									' cart ')
							}
						}
					}
				}
			} else {
				throw new Error('Method "cost" must have 2 parameters: id (number) - position of product in cart, price (number) - price of product in' +
					' cart ')
			}
		} catch (e) {
			throw new Error(`${e.message}`)
		}
	}

	totalCost (price) {
		try {
			let result =0;
			for (let item in this.items) {
				if (this.items.hasOwnProperty(item)) {
					if (price && item.product[price] && typeof item.product[price] === 'number') {
						result += item.product[price];
					} else {
						throw new Error('Method "totalCost" must have parameter: price (number) - price of product in' +
							' cart ')
					}
				}
			}
			return result
		} catch (e) {
			throw new Error(`${e.message}`)
		}
	}
}