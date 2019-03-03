import CommonMethods from './CommonMethods.js';
import Shop from './Shop.js';

export default class ShopContainer extends CommonMethods { // содержит все созданные searchs
	constructor(options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ShopContainer.newProperty(options, 'name', 'shopContainer', 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'items': {
				value: ShopContainer.newProperty(options, 'item', [], 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			}
		})
	}

	createShop (shop) {
		if (shop instanceof Shop) {
			if (shop.name) {
				for (let i in this.items) {
					if (this.items.hasOwnProperty(i)) {
						if (this.items.name === shop.name) {
							console.log(new Error (`${shop.name} is already in ${this.name}`));
							return;
						}
					}
				}
				this.items.push(shop);
				Object.preventExtensions(shop); // запрещаем добавлять новые элементы

				shop.productList.fetchSource(shop.productList.url)
					.then(() => {
						shop.initPage(shop.checkPageNumber(shop.pageNumber));
						shop.render(shop.where, shop.whereId, shop.cart);
					});

				return this.items[this.items.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "Shop"`)
		}
	}
}