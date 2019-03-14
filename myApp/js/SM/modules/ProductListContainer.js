import CommonMethods from './CommonMethods.js';
import ProductList from './ProductList.js';

export default class ProductListContainer extends CommonMethods { // содержит все созданные productLists
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ProductList.newProperty(options, 'name', 'productListsContainer', 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'items': {
				value: ProductList.newProperty(options, 'item', [], 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'mod': {
				value: ProductList.newProperty(options, 'mod', undefined, 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			}
		})
	}

	createProductList (productList) {
		if (productList instanceof ProductList) {
			if (productList.name) {
				for (let i in this.items) {
					if (this.items.hasOwnProperty(i)) {
						if (this.items.name === productList.name) {
							console.log(new Error (`${productList.name} is already in ${this.name}`));
							return;
						}
					}
				}
				this.items.push(productList);
				return this.items[this.items.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "ProductList"`)
		}
	}
}