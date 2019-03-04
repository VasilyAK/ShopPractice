import CommonMethods from './CommonMethods.js';
import Product from './Product.js';
import ProductList from './ProductList.js';
import CartProduct from './CartProduct.js';

export default class Cart extends CommonMethods {
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: Cart.newProperty(options, 'name', 'cart', 'string'),
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
}