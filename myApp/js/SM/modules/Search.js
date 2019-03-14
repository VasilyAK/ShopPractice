import CommonMethods from './CommonMethods.js';
import ProductList from "./ProductList.js";
import Product from './Product.js';
import {SM} from '../ShopMaker.js';
import {SM$V} from '../ShopMaker.js';

export default class Search extends CommonMethods {
	constructor (options) {
		super(options);
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

				'where': {
					value: Search.newProperty(options, 'where', new Error('"where" is necessary property'), 'object', Search.checkWhere),
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
				},

				'searchBlock': {
					value: Search.newProperty(options, 'searchBlock', new Error('"searchBlock" is necessary property'), 'function'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'emptySearchBlock': {
					value: Search.newProperty(options, 'emptySearchBlock', new Error('"emptySearchBlock" is necessary property'), 'function'),
					configurable: false,
					enumerable: true,
					writable: false
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
					let countMatches = 0;
					for(let j in productList.source[i]){
						if (productList.source[i].hasOwnProperty(j)) {
							let result = String(productList.source[i][j]).match(re);
							if (result !== null){
								countMatches += result.length
							}
						}
					}
					if (countMatches > 0){
						this.map.push({
							id: this.map.length+1,
							productList: productList.name,
							productNode: i,
							countMatches: countMatches,
							product: new Product(productList.source[i])
						})
					}
				}
			}
		}
	}

	search (text) { // text необязательный параметр, нужен для vue
		this.map = [];
		if ((this.input && this.input.value !== '') || (text && text !== ''))	 {
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

			this.map.sort((a, b) => { //сортируем по количеству совпадений при поиске
				return b.countMatches - a.countMatches;
			});

			this.reId();
		}

		if (this.mod === 'VUE') {
			return this.map;
		}

	}

	reId () {
		for (let i = 0; i < this.map.length; i++){
			this.map[i].id = i+1;
		}
	}

	render () {
		this.renderSearch();
		this.afterRenderInit();
	}

	renderSearch () { // whereId - идентификатор вставляемого элемента
		if (this.map.length === 0) {
			this.where.innerHTML = this.emptySearchBlock();
		} else {
			let repeat = [];

			this.map.forEach((sp, index) => {
				if (sp.product instanceof Product){
					this.where.innerHTML = '';
					this.where.innerHTML = this.searchBlock(sp, index);
					repeat.push(this.where.querySelectorAll('[repeat="sp"]'));
				} else {
					console.log(new Error(`${this.name}.page number ${index} has element that is not a copy of "Product"`));
				}
			});

			let repeatFiltered = [];
			repeat[0].forEach(()=>{
				repeatFiltered.push([]);
			});

			for (let i = 0; i < repeat.length; i++) {
				if (repeat[i] instanceof NodeList) {
					for (let j = 0; j < repeat[i].length; j++) {
						repeatFiltered[j][i] = repeat[i][j];
					}
				} else {
					repeatFiltered[i] = repeat[i]
				}
			}

			repeatFiltered.forEach((rep) => {
				if (rep instanceof Array) {
					let repInner = '';
					const child = this.where.querySelector('[repeat="sp"]');
					for(let i=0; i < rep.length; i++) {
						rep[i].removeAttribute('repeat');
						if (i < rep.length-1) {
							child.parentNode.insertBefore(rep[i], child);

						}
					}
				} else {
					this.where.querySelector('[repeat="cp"]').innerHTML = rep;
				}
			});
		}
	}
}