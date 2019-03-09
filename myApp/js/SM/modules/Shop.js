import CommonMethods from './CommonMethods.js';
import ProductList from './ProductList.js';
import Cart from './Cart.js';
import Search from './Search.js';
import Product from './Product.js';
import {SM} from '../ShopMaker.js';

export default class Shop extends CommonMethods {
	constructor (options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE') {
			this.name = Shop.newProperty(options, 'name', new Error('"name" is necessary property'), 'string');
			this.productList = Shop.newProperty(options, 'productList', new Error('"productList" is necessary property'), 'object', Shop.checkProductList);
			this.search = Shop.newProperty(options, 'search', undefined, 'object', Shop.checkSearch);
			this.cart = Shop.newProperty(options, 'cart', undefined, 'object', Shop.checkCart);
			this.page = Shop.newProperty(options, 'page', options['mod'] === 'VUE' ? undefined: [], 'object');
			this.pageNumber = Shop.newProperty(options, 'pageNumber', 1, 'number');
			this.productsOnPage = Shop.newProperty(options, 'productsOnPage', 6, 'number', Shop.checkProductsOnPage);
			this.mod = 'VUE';
		} else {
			Object.defineProperties(this, {
				'name': {
					value: Shop.newProperty(options, 'name', new Error('"name" is necessary property'), 'string'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'where': {
					value: Shop.newProperty(options, 'where', new Error('"where" is necessary property'), 'object', Shop.checkWhere),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'whereId': {
					value: Shop.newProperty(options, 'whereId', new Error('"whereId" is necessary property'), 'string'),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'productList': {
					value: Shop.newProperty(options, 'productList', new Error('"productList" is necessary property'), 'object', Shop.checkProductList),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'search': {
					value: Shop.newProperty(options, 'search', undefined, 'object', Shop.checkSearch),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'cart': {
					value: Shop.newProperty(options, 'cart', undefined, 'object', Shop.checkCart),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'page': {
					value: Shop.newProperty(options, 'page', [], 'object'),
					configurable: false,
					enumerable: true,
					writable: true
				},

				'pageNumber': {
					value: Shop.newProperty(options, 'pageNumber', 1, 'number'),
					configurable: false,
					enumerable: true,
					writable: true
				},

				'productsOnPage': {
					value: Shop.newProperty(options, 'productsOnPage', 18, 'number', Shop.checkProductsOnPage),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'productsOnLine': {
					value: Shop.newProperty(options, 'productsOnLine', 6, 'number', Shop.checkProductsOnLine),
					configurable: false,
					enumerable: true,
					writable: false
				},

				'productBlock': {
					value: Shop.newProperty(options, 'productBlock', new Error('"productBlock" is necessary property'), 'function'),
					configurable: false,
					enumerable: true,
					writable: false
				}
			})
		}
	}

	render(pageNumber) {
		this.initPage(pageNumber);
		return this.renderPage(this.where, this.whereId, this.cart);
	}

	findProductDouble (product) {
		if (product instanceof Product){
			for (let i in this.page) {
				if (this.page[i].identity(product)) {
					console.log(new Error(`${this.name} has already initialized`));
					return product;
				}
			}
			return product;
		} else {
			throw new Error(`New object is not a copy of "Product"`)
		}
	}

	initPage (pageNumber) {
		this.page = new Array(0);
		this.pageNumber = this.checkPageNumber(pageNumber);
		for (let i = (this.pageNumber-1)*(this.productsOnPage); i < (this.pageNumber)*(this.productsOnPage); i++) {
			if (this.productList.source[i]){
				if (this.mod === 'VUE') {
					this.productList.source[i].mod = 'VUE';
				}
				this.page.push(this.findProductDouble(new Product(this.productList.source[i])));
			} else {
				return
			}
		}
	}

	renderPage (where, whereId, cart) { // whereId - идентификатор вставляемого элемента
		const mainProductList = document.createElement('div');
		mainProductList.setAttribute('id', whereId);
		mainProductList.style.border = `none`;
		mainProductList.style.boxSizing = `border-box`;
		mainProductList.style.display = `flex`;
		mainProductList.style.flexFlow = `row wrap`;
		mainProductList.style.width = `100%`;

		this.page.forEach((pp, index) => {
			if (pp instanceof Product){
				const itemBlock = document.createElement('div');
				itemBlock.style.border = `none`;
				itemBlock.style.boxSizing = `border-box`;
				itemBlock.style.display = `flex`;
				itemBlock.style.flexFlow = `row nowrap`;
				itemBlock.style.width = `${100 / this.productsOnLine}%`;
				// тут вставляется пользовательский блок для продукта
				itemBlock.innerHTML = this.productBlock(pp);

				mainProductList.appendChild(itemBlock);
			} else {
				console.log(new Error(`${this.name}.page number ${index} has element that is not a copy of "Product"`));
			}
		});

		/*
		ПОПРОБОВАТЬ ПЕРЕДЕЛАТЬ УДАЛЕНИЕ НЕ ВСЕГО БЛОКА, А КАЖДОГО ПОДБЛОКА ПО ОТДЕЛЬНОСТИ, ЧТОБЫ КАРТИНКА НЕ ПРЫГАЛА, ИЛИ ВООБЩЕ ДОБАВИТЬ АНИМАЦИЮ ПЕРЕХОДОВ
		 */
		let whereChild;
		for (let i = 0; i < where.childNodes.length; i++) { // удаляем предудыщую отрисовку, если такая есть
			if (where.childNodes[i].nodeType === 1 && where.childNodes[i].getAttribute('id') === whereId) {
				where.removeChild(where.childNodes[i]);
			}
			if (where.childNodes[i].nodeType === 1 && where.childNodes[i].getAttribute('id') === `${whereId}-nav`) {
				where.removeChild(where.childNodes[i]);
				if (where.childNodes[i] && where.childNodes[i].nodeType === 1) {
					whereChild = where.childNodes[i];
					break;
				}
			}
		}
		if (whereChild) {
			where.insertBefore(mainProductList, whereChild);
			where.insertBefore(this.createNav(whereId, this.pageNumber - 2, this.pageNumber + 2, this.pageNumber, where, cart), whereChild);
		} else {
			where.appendChild(mainProductList);
			where.appendChild(this.createNav(whereId, this.pageNumber - 2, this.pageNumber + 2, this.pageNumber, where, cart));
		}
		return mainProductList;
	}

	createNav (whereId, from, to, active, where, cart) {
		//навигационная панель
		if (from < 1 ) {
			from = 1;
			to = 5
		}
		if (to > Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage)){
			to = Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage);
			from = to - 4;
		}
		const nav = document.createElement('div');
		nav.setAttribute('class', `${whereId}__nav`);
		nav.setAttribute('id', `${whereId}-nav`);

		const ul = document.createElement('ul');
		ul.setAttribute('class', `pagination`);

		const liFirst = document.createElement('li');
		const liPrev = document.createElement('li');
		if (from === active){
			liFirst.setAttribute('class', 'page-item disabled');
			liPrev.setAttribute('class', 'page-item disabled');
		} else {
			liFirst.setAttribute('class', 'page-item');
			liPrev.setAttribute('class', 'page-item');
		}

		const liFirstP = document.createElement('span');
		const liPrevP = document.createElement('span');
		liFirstP.setAttribute('class', `page-link`);
		liPrevP.setAttribute('class', `page-link`);
		liFirstP.style.cursor = 'pointer';
		liPrevP.style.cursor = 'pointer';
		liFirstP.textContent = 'Первая';
		liPrevP.textContent = '«';

		liFirstP.addEventListener('click', () => {
			this.initPage(1);
			this.renderPage(where, whereId, cart, this.pageNumber);
		});
		liPrevP.addEventListener('click', () => {
			this.initPage(this.pageNumber-1);
			this.renderPage(where, whereId, cart, this.pageNumber);
		});

		liFirst.appendChild(liFirstP);
		liPrev.appendChild(liPrevP);
		ul.appendChild(liFirst);
		ul.appendChild(liPrev);

		for (let i = from; i < to+1; i++){
			const li = document.createElement('li');
			if (i === active){
				li.setAttribute('class', 'page-item active');
			} else {
				li.setAttribute('class', 'page-item');
				li.addEventListener('click', () => {
					this.initPage(i);
					this.renderPage(where, whereId, cart, this.pageNumber);
				});
			}
			const liP = document.createElement('span');
			liP.setAttribute('class', `page-link`);
			liP.style.cursor = 'pointer';
			liP.textContent = i;

			li.appendChild(liP);
			ul.appendChild(li);
		}

		const liLast = document.createElement('li');
		const liNext = document.createElement('li');
		if (to === active){
			liLast.setAttribute('class', 'page-item disabled');
			liNext.setAttribute('class', 'page-item disabled');
		} else {
			liLast.setAttribute('class', 'page-item');
			liNext.setAttribute('class', 'page-item');
		}

		const liLastP = document.createElement('span');
		const liNextP = document.createElement('span');
		liLastP.setAttribute('class', `page-link`);
		liNextP.setAttribute('class', `page-link`);
		liLastP.style.cursor = 'pointer';
		liNextP.style.cursor = 'pointer';
		liLastP.textContent = 'Последняя';
		liNextP.textContent = '»';

		liLastP.addEventListener('click', () => {
			this.initPage(Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage));
			this.renderPage(where, whereId, cart, this.pageNumber);
		});
		liNextP.addEventListener('click', () => {
			this.initPage(this.pageNumber+1);
			this.renderPage(where, whereId, cart, this.pageNumber);
		});

		liNext.appendChild(liNextP);
		liLast.appendChild(liLastP);
		ul.appendChild(liNext);
		ul.appendChild(liLast);
		nav.appendChild(ul);
		return  nav;
	}

	static checkProductList (productList, name) {
		try {
			if (!(productList instanceof ProductList)){
				throw new Error(`${name} error: 'productList' is not a copy of ProductList`)
			} else {
				return productList;
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	static checkCart (cart, name) {
		try {
			if (!(cart instanceof Cart)){
				throw new Error(`${name} error: 'cart' is not a copy of Cart`)
			} else {
				return cart;
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	static checkSearch (search, name) {
		try {
			if (!(search instanceof Search)){
				throw new Error(`${name} error: 'search' is not a copy of Search`)
			} else {
				return search;
			}
		} catch(e){
			throw new Error(`${e.message}`);
		}
	}

	static checkProductsOnPage (productsOnPage, name) {
		try {
			if (parseInt(productsOnPage) === parseFloat(productsOnPage)){
				if (productsOnPage < 1) {
					console.log(new Error(`${this.name} error: min 'productsOnPage' must be 1}`));
					return 1;
				} else {
					return productsOnPage;
				}
			} else {
				throw new Error(`${this.name} error: 'productsOnPage' must be integer`);
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	static checkProductsOnLine (productsOnLine, name) {
		try {
			if (parseInt(productsOnLine) === parseFloat(productsOnLine)){
				if (productsOnLine < 1) {
					console.log(new Error(`${this.name} error: min 'productsOnLine' must be 1}`));
					return 1;
				} else {
					return productsOnLine
				}
			} else {
				throw new Error(`${this.name} error: 'productsOnLine' must be integer`);
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	static checkWhereId (whereId, name) {
		try {
			for (let i in SM.shc){
				if (SM.shc[i].whereId === whereId) {
					throw new Error (`${whereId} is already used`)
				}
			}
			return whereId;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	checkPageNumber(pageNumber) {
		try {
			if (parseInt(pageNumber) === parseFloat(pageNumber)) {
				if (pageNumber < 1) {
					console.log(new Error(`${this.name} error: min page must be 1}`));
					return 1;
				} else if (pageNumber <= Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage)) {
					return pageNumber;
				} else {
					console.log(new Error(`${this.name} error: max page must be ${Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage)}`));
					return Math.ceil(Object.keys(this.productList.source).length / this.productsOnPage);
				}
			} else {
				throw new Error(`${this.name} error: 'page' must be integer`);
			}
		} catch (e) {
			throw new Error(`${e.message}. 'page' is a required parameter`);
		}
	}
}