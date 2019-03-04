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
			}
		})
	}

	createSearch (search) {
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
				Object.preventExtensions(search); // запрещаем добавлять новые элементы
				// навешиваем обработчики событий
				search.button.addEventListener('click', search.search.bind(search));

				return this.items[this.items.length-1]; //функция возвращает новый созданный объект
			} else {
				throw new Error (`New object must have property "name"`)
			}
		} else {
			throw new Error (`New object is not a copy of "Cart"`)
		}
	}
}