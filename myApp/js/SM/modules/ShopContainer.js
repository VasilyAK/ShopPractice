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
			},

			'mod': {
				value: ShopContainer.newProperty(options, 'mod', undefined, 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			}
		})
	}

	createShop (shop, mod) {
		if (shop instanceof Shop) {
			if (shop.name) {
				for (let i in this.items) {
					if (this.items.hasOwnProperty(i)) {
						if (this.items[i].name === shop.name) {
							console.log(new Error (`${shop.name} is already in ${this.name}`));
							return;
						}
					}
				}
				this.items.push(shop);

				const newShop = (shop.productList.fetchSource(shop.productList.url)
					.then(() => {
						if (this.mod && this.mod === 'VUE') {
							shop.initPage(shop.pageNumber)
						} else {
							shop.render(shop.pageNumber);
							shop.onLoadInit()
						}
						return this.items[this.items.length-1]; //функция возвращает новый созданный объект
					}));

				if (this.mod === 'VUE') {
					return newShop
				} else {
					return this.items[this.items.length-1]
				}
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "Shop"`)
		}
	}
}