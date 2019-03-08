import Shop from './Shop.js';
import ProductList from './ProductList.js';
import Cart from './Cart.js';
import Search from './Search.js';
import CommonMethods from './CommonMethods.js';

export default class SMVAK extends CommonMethods {
	constructor (options) {
		super ();
		Object.defineProperties(this, {

			'shc': { // shopContainer
				value: SMVAK.newProperty(options, 'shc', Error('"shc" is a required property'), 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'plc': { // productListContainer
				value: SMVAK.newProperty(options, 'plc', Error('"plc" is a required property'), 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'sc': { // sourceContainer
				value: SMVAK.newProperty(options, 'sc', Error('"sc" is a required property'), 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'cc': { // cartContaner
				value: SMVAK.newProperty(options, 'cc', Error('"shc" is a required property'), 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			}
		})
	}

	createCart (options) {
		return this.cc.createCart(new Cart({
			name: options.name,
			button: options.button,
			mod: this.cc.mod
		}), this.sc.mod)
	}

	createSearch (options) {
		return this.sc.createSearch(new Search({
			name: options.name,
			input: options.input,
			button: options.button,
			mod: this.sc.mod
		}), this.sc.mod)
	}

	createProductList (options) {
		return this.plc.createProductList(new ProductList({
			name: options.name,
			jsonDeclare: options.jsonDeclare,
			url: options.url,
		}))
	}

	createShop (options) {
		return this.shc.createShop (new Shop ({
			name: options.name,
			where: options.where,
			whereId: options.whereId,
			productList: options.productList,
			cart: options.cart,
			search: options.search,
			pageNumber: options.pageNumber,
			productsOnPage: options.productsOnPage,
			productsOnLine: options.productsOnLine,
			productBlock: options.productBlock,
			mod: this.shc.mod
		}), this.shc.mod);
	}
}