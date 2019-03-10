import CommonMethods from './CommonMethods.js';
import Product from './Product.js';
import CartProduct from './CartProduct.js';

export default class Cart extends CommonMethods {
	constructor (options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE') {
			this.name = Cart.newProperty(options, 'name', new Error('"name" is a required property'), 'string');
			this.items = Cart.newProperty(options, 'items', [], 'object');
			this.mod = 'VUE';
		} else {
			Object.defineProperties(this, {
				'name': {
					value: Cart.newProperty(options, 'name', new Error('"name" is a required property'), 'string'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'button': {
					value: Cart.newProperty(options, 'button', new Error(`'button' is a required parameter`), 'object', Cart.checkWhere),
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
	}

	addCartProduct (product) {
		if (product instanceof Product){
			for (let i in this.items) {
				if (this.items.hasOwnProperty(i)) {
					if (this.items[i].product.identity(product)) { // если в корзине есть товар, добавляем его колличество
						if (this.mod = 'VUE') {
							return {
								index: i,
								value: new CartProduct ({
									id: this.items[i].id,
									product: product,
									quantity: this.items[i].quantity + 1,
									mod: this.mod
								})
							}
						} else {
							this.items[i].quantity++;
							return
						}

					}
				}
			}
			if (this.mod = 'VUE') {
				return {
					index: this.items.length,
					value: new CartProduct ({
						id: this.items.length+1,
						product: product,
						quantity: 1,
						mod: this.mod
					})
				}
			} else {
				this.items.push (new CartProduct ({
					id: this.items.length+1,
					product: product,
					mod: this.mod
				}));
			}
		} else {
			throw new Error(`New object is not a copy of "Product"`)
		}
	}

	removeCartProduct (id) {
		for (let i in this.items){
			if (this.items.hasOwnProperty(i)) {
				if (this.items[i].id === id) {
					if (this.mod === 'VUE') {
						return i
					} else {
						this.items.splice(i,1);
						this.reId();
						return
					}
				}
			}
		}
		console.log (new Error(`${this.name} does not have product with id ${id}`));
	}

	// для Vue фуркцию reId нужно вызывать после удаления элемента из корзины
	reId () {
		for (let i = 0; i < this.items.length; i++){
			this.items[i].id = i+1;
		}
	}

	itemsCount () {
		return this.items.length
	}

	cost (id, price) {
		try {
			if (typeof id === 'number') {
				for (let item in this.items) {
					if (this.items.hasOwnProperty(item) && this.items[item].id === id) {
						if (this.items[item].product[price] && typeof this.items[item].product[price] === 'number') {
							return this.items[item].product[price] * this.items[item].quantity
						} else {
							throw new Error(`Type of ${price} must bu number`)
						}
					}
				}
			} else {
				throw new Error('Method "cost" must have 2 parameters: id - position of product in cart, price - price of product in' +
					' cart ')
			}
		} catch (e) {
			throw new Error(`${e.message}`)
		}
	}

	totalCost (price) {
		try {
			let result = 0;
			if (typeof price === 'string') {
				for (let item in this.items) {
					if (this.items.hasOwnProperty(item)) {
						if (this.items[item].product[price] && typeof this.items[item].product[price] === 'number') {
							result += this.items[item].product[price] * this.items[item].quantity;
						} else {
							throw new Error(`Type of ${price} must bu number`)
						}
					}
				}
			} else {
				throw new Error(`Method "totalCost" must have parameter: price (string) - name of product price in 'cart'`)
			}
			return result
		} catch (e) {
			throw new Error(`${e.message}`)
		}
	}
}