import CommonMethods from './CommonMethods.js';
import Search from './Search.js';

export default class SearchContainer extends CommonMethods { // содержит все созданные searchs
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: SearchContainer.newProperty(options, 'name', 'searchContainer', 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'items': {
				value: SearchContainer.newProperty(options, 'item', [], 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'mod': {
				value: SearchContainer.newProperty(options, 'mod', undefined, 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			}
		})
	}

	createSearch (search, mod) {
		if (search instanceof Search) {
			if (search.name) {
				for (let i in this.items) {
					if (this.items.hasOwnProperty(i)) {
						if (this.items.name === search.name) {
							console.log(new Error (`${search.name} is already in ${this.name}`));
							return;
						}
					}
				}
				this.items.push(search);
				search.onLoadInit();
				return this.items[this.items.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "Cart"`)
		}
	}
}