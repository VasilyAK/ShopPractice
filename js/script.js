import CommonMethods from "./modules/CommonMethods";
import ProductList from "./modules/ProductList";
import ProductListConteiner from "./modules/ProductListConteiner";

class Cart extends CommonMethods {
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ProductList.newProperty(options, 'name', 'cart'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'cartProducts': {
				value: ProductList.newProperty(options, 'cartProducts', [], 'object'),
				configurable: false,
				enumerable: true
			},

			'totalCost': {
				enumerable: true,
				get: function () {
					let result = 0;
					for (let i in this.cartProducts){
						result +=this.cartProducts[i].product.price;
					}
					return result;
				}
			}
		})
	}

	createCartProduct (product) {
		if (product instanceof Product){
			for (let i in this.cartProducts) {
				if (this.cartProducts[i].product.identity(product)) { // если в корзине есть товар, добавляем его колличество
					this.cartProducts[i].number++;
					return
				}
			}

			this.cartProducts.push (new CartProduct ({
				position: this.cartProducts.length+1,
				product: product,
			}));
		} else {
			throw new Error(`New object is not a copy of "Product"`)
		}
	}

	removeCartProduct (position) {
		for (let i in this.cartProducts){
			if (this.cartProducts[i].position === position) {
				this.cartProducts.splice(i,1);
				rePos.call(this);
				return
			}
		}
		console.log (new Error(`${this.name} does not have product on position ${position}`));

		function rePos() {
			for (let i in this.cartProducts){
				this.cartProducts[i].position = parseInt(i)+1;
			}
		}
	}
}

class CartProduct extends CommonMethods {
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

const plc = new ProductListConteiner();

const cart = new Cart({
	name: 'mainCart'
});