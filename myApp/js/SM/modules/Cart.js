import CommonMethods from './CommonMethods.js';
import Product from './Product.js';
import CartProduct from './CartProduct.js';
import {SM} from '../ShopMaker.js';

export default class Cart extends CommonMethods {
	constructor (options) {
		super(options);
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

				'where': {
					value: Cart.newProperty(options, 'where', new Error('"where" is necessary property'), 'object', Cart.checkWhere),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'items': {
					value: Cart.newProperty(options, 'items', [], 'object'),
					configurable: false,
					enumerable: true
				},

				'cartBlock': {
					value: Cart.newProperty(options, 'cartBlock', new Error('"cartBlock" is necessary property'), 'function'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'emptyCartBlock': {
					value: Cart.newProperty(options, 'emptyCartBlock', new Error('"emptyCartBlock" is necessary property'), 'function'),
					configurable: false,
					enumerable: true,
					writable: false
				}
			})
		}
	}

	getProductByIndex (index) {
		for (let shop in SM.shc.items) {
			if (SM.shc.items.hasOwnProperty(shop)){
				if (SM.shc.items[shop].cart.name === this.name){
					if (SM.shc.items[shop].page.length > 0) {
						return SM.shc.items[shop].page[index]
					}
				}
			}
		}
	}

	addCartProduct (product) {
		if (product instanceof Product){
			for (let i in this.items) {
				if (this.items.hasOwnProperty(i)) {
					if (this.items[i].product.identity(product)) { // если в корзине есть товар, добавляем его колличество
						if (this.mod === 'VUE') {
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
			if (this.mod === 'VUE') {
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

	render () {
		this.renderCart();
		this.afterRenderInit();
	}

	renderCart () { // whereId - идентификатор вставляемого элемента
		if (this.items.length === 0) {
			this.where.innerHTML = this.emptyCartBlock();
		} else {
			let repeat = [];

			this.items.forEach((cp, index) => {
				if (cp instanceof CartProduct){
					this.where.innerHTML = '';
					this.where.innerHTML = this.cartBlock(cp, index);
					repeat.push(this.where.querySelectorAll('[repeat="cp"]'));
				} else {
					console.log(new Error(`${this.name}.page number ${index} has element that is not a copy of "Product"`));
				}
			});

			let repeatFiltered = [];
			repeat[0].forEach(()=>{
				repeatFiltered.push([]);
			});

			for (let i = 0; i < repeat.length; i++) {
				if (repeat[i] instanceof NodeList) {
					for (let j = 0; j < repeat[i].length; j++) {
						repeatFiltered[j][i] = repeat[i][j];
					}
				} else {
					repeatFiltered[i] = repeat[i]
				}
			}

			repeatFiltered.forEach((rep) => {
				if (rep instanceof Array) {
					let repInner = '';
					const child = this.where.querySelector('[repeat="cp"]');
					for(let i=0; i < rep.length; i++) {
						rep[i].removeAttribute('repeat');
						if (i < rep.length-1) {
							child.parentNode.insertBefore(rep[i], child);

						}
					}
				} else {
					this.where.querySelector('[repeat="cp"]').innerHTML = rep;
				}
			});
		}
	}
}