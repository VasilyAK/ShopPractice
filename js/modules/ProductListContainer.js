import CommonMethods from './CommonMethods.js';
import ProductList from './ProductList.js';

export default class ProductListContainer extends CommonMethods { // содержит все созданные productLists
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ProductList.newProperty(options, 'name', 'productListsContainer'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'item': {
				value: ProductList.newProperty(options, 'item', [], 'object'),
				configurable: false,
				enumerable: true,
			}
		})
	}

	createProductList (productList) {
		if (productList instanceof ProductList) {
			if (productList.name) {
				for (let i in this.item) {
					if (this.item.name === productList.name) {
						console.log(new Error (`${productList.name} is already in ${this.name}`));
						return;
					}
				}
				this.item.push(productList);
				Object.preventExtensions(productList); // запрещаем добавлять новые элементы
				return this.item[this.item.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "ProductList"`)
		}
	}
}