import CommonMethods from './CommonMethods.js';
import ProductList from "./ProductList.js";
import Product from './Product.js';
import {SM} from '../ShopMaker.js';
import {SM$V} from '../ShopMaker.js';

export default class Search extends CommonMethods {
	constructor (options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE') {
			this.name = Search.newProperty(options, 'name', new Error('"name" is a required property'), 'string');
			this.text = Search.newProperty(options, 'text', [], 'object');
			this.map = Search.newProperty(options, 'map', [], 'object');
			this.mod = 'VUE';
		} else {
			Object.defineProperties(this, {
				'name': {
					value: Search.newProperty(options, 'name', new Error('"name" is a required property'), 'string'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'input': {
					value: Search.newProperty(options, 'input', new Error(`'input' is a required parameter`), 'object', Search.checkWhere),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'button': {
					value: Search.newProperty(options, 'button', new Error(`'button' is a required parameter`), 'object', Search.checkWhere),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'text': {
					value: Search.newProperty(options, 'text', [], 'object'),
					configurable: false,
					enumerable: true,
					writable: true
				},

				// простейшая карта по результатам поиска
				'map': {
					value: Search.newProperty(options, 'map', [], 'object'),
					configurable: false,
					enumerable: true,
					writable: true
				}
			});
		}
	}

	setText(input) {
		input = input.replace(/[^A-Za-zА-Яа-я\d\s-]+/gi, '');
		input = input.replace(/^\s+|\s+$/gi, '');
		if (input !== ''){
			this.text = [];
			input.split(' ').forEach((word) => {
				this.text.push(word.replace(/([а]|[е]|[ё]|[и]|[о]|[у]|[ы]|[э]|[ю]|[я])+$/i, ``))
			});
		}
	}

	ranging (productList) {
		if (productList instanceof ProductList){
			this.text.forEach((word) => {
				find.call(this, word, productList)
			});
		} else {
			console.log(new Error(`${productList} is not a copy of ProductList`));
		}

		function find (word, productList) {
			const re = new RegExp(`${word}`, 'gim');
			for (let i in productList.source){
				if (productList.source.hasOwnProperty(i)) {
					let countMutches = 0;
					for(let j in productList.source[i]){
						if (productList.source[i].hasOwnProperty(j)) {
							let result = String(productList.source[i][j]).match(re);
							if (result !== null){
								countMutches += result.length
							}
						}
					}
					if (countMutches > 0){
						this.map.push({
							id: this.map.length+1,
							productList: productList.name,
							productNode: i,
							countMutches: countMutches,
							product: new Product(productList.source[i])
						})
					}
				}
			}
		}
	}

	search (text) { // text необязательный параметр, нужен для vue
		this.map = [];
		if (this.mod === 'VUE') {
			this.setText(text)
		} else {
			this.setText(this.input.value);
		}

		const thisSM = this.mod === 'VUE' ? SM$V : SM;

		for (let i in thisSM.shc.items){
			if (thisSM.shc.items.hasOwnProperty(i)) {
				if (thisSM.shc.items[i].search.name === this.name) {
					this.ranging(thisSM.shc.items[i].productList);
				}
			}
		}
		if (this.mod === 'VUE') {
			console.log(this.map);
			return this.map
		}

	}
}