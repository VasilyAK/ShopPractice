import CommonMethods from './CommonMethods.js';
import Product from './Product.js';
import Cart from './Cart.js';

export default class ProductList extends CommonMethods{
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ProductList.newProperty(options, 'name', new Error('"name" is necessary property')),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'products': {
				value: ProductList.newProperty(options, 'products', [], 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'source': {
				value: ProductList.newProperty(options, 'source', {}, 'object'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'page': {
				value: Product.newProperty(options, 'page', 1, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'productsOnPage': {
				value: Product.newProperty(options, 'page', 18, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			},

			'productsOnLine': {
				value: Product.newProperty(options, 'page', 6, 'number'),
				configurable: false,
				enumerable: true,
				writable: true
			}

		})
	}

	createProduct (product) {
		if (product instanceof Product){
			for (let i in this.products) {
				if (this.products[i].identity(product)) {
					console.log(new Error(`${this.name} has already initialized`));
					return
				}
			}
			Object.preventExtensions(product); // запрещаем добавлять новые элементы
			this.products.push(product);
		} else {
			throw new Error(`New object is not a copy of "Product"`)
		}
	}

	removeProduct (product) {
		if (product instanceof Product) {
			for (let i in this.products) {
				if ((this.products[i].identity(product))) {
					this.products.splice(i, 1);
					return
				}
			}
			throw new Error(`Parameter is not in ${this.name}`)
		} else {
			throw new Error(`Parameter is not a copy of "Product"`)
		}
	}

	render (where, id, cart, from, to) { // id - идентификатор вставляемого элемента
		const mainProductList = document.createElement('div');
		mainProductList.setAttribute('class', 'main__products-list');
		mainProductList.setAttribute('id', id);

		this.products.forEach((elem, index) => {
			if (elem instanceof Product){
				const itemBlock = document.createElement('div');
				itemBlock.setAttribute('class', 'main-products-list__item-block');
				itemBlock.style.width = `${100 / this.productsOnLine}%`;

				const item = document.createElement('div');
				item.setAttribute('class', 'main-products-list__item');

				const imgBlock = document.createElement('div');
				imgBlock.setAttribute('class', 'main-products-list__item-img-block');

				const img = document.createElement('img');
				img.setAttribute('class', 'main-products-list__item-img');
				img.setAttribute('src', elem.image);

				const title = document.createElement('p');
				title.setAttribute('class', 'main-products-list__item-title');
				title.innerHTML = `${elem.title}</br>${elem.price} руб.`;

				const btnAdd = document.createElement('button');
				btnAdd.setAttribute('class', 'main-products-list__item-btn-add product-btn');
				btnAdd.textContent = 'Добавить';
				btnAdd.addEventListener('click', () => {cart.createCartProduct(elem)});

				imgBlock.appendChild(img);
				item.appendChild(imgBlock);
				item.appendChild(title);
				item.appendChild(btnAdd);
				itemBlock.appendChild(item);
				mainProductList.appendChild(itemBlock);
			} else {
				console.log(new Error(`${this}.products number ${index} has element that is not a copy of "Product"`));
			}
		});

		/*
		ПОПРОБОВАТЬ ПЕРЕДЕЛАТЬ УДАЛЕНИЕ НЕ ВСЕГО БЛОКА, А КАЖДОГО ПОДБЛОКА ПО ОТДЕЛЬНОСТИ, ЧТОБЫ КАРТИНКА НЕ ПРЫГАЛА, ИЛИ ВООБЩЕ ДОБАВИТЬ АНИМАЦИЮ ПЕРЕХОДОВ
		 */
		let whereChild;
		for (let i = 0; i < where.childNodes.length; i++) { // удаляем предудыщую отрисовку, если такая есть
			if (where.childNodes[i].nodeType === 1 && where.childNodes[i].getAttribute('id') === id) {
				where.removeChild(where.childNodes[i]);
			}
			if (where.childNodes[i].nodeType === 1 && where.childNodes[i].getAttribute('id') === `${id}-nav`) {
				where.removeChild(where.childNodes[i]);
				if (where.childNodes[i] && where.childNodes[i].nodeType === 1) {
					whereChild = where.childNodes[i];
					break;
				}
			}
		}
		if (whereChild) {
			where.insertBefore(mainProductList, whereChild);
			where.insertBefore(this.creatNav(id, this.page - 2, this.page + 2, this.page, where, cart), whereChild);
		} else {
			where.appendChild(mainProductList);
			where.appendChild(this.creatNav(id, this.page - 2, this.page + 2, this.page, where, cart));
		}
	}

	creatNav (id, from, to, active, where, cart) {
		//навигационная панель
		if (from < 1 ) {
			from = 1
		}
		if (to > Math.ceil(Object.keys(this.source).length / this.productsOnPage)){
			to = Math.ceil(Object.keys(this.source).length / this.productsOnPage)
		}
		const nav = document.createElement('div');
		nav.setAttribute('class', 'main-products-list__nav');
		nav.setAttribute('id', `${id}-nav`);

		const ul = document.createElement('ul');
		ul.setAttribute('class', 'pagination main-products-list__nav-ul');

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
		liFirstP.setAttribute('class', 'page-link main-products-list__nav-span');
		liPrevP.setAttribute('class', 'page-link main-products-list__nav-span');
		liFirstP.textContent = 'Первая';
		liPrevP.textContent = '«';

		liFirstP.addEventListener('click', () => {
			this.initPage(1);
			this.render(where, id, cart, this.page);
		});
		liPrevP.addEventListener('click', () => {
			this.initPage(this.page-1);
			this.render(where, id, cart, this.page);
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
					this.render(where, id, cart, this.page);
				});
			}
			const liP = document.createElement('span');
			liP.setAttribute('class', 'page-link main-products-list__nav-span');
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
		liLastP.setAttribute('class', 'page-link main-products-list__nav-span');
		liNextP.setAttribute('class', 'page-link main-products-list__nav-span');
		liLastP.textContent = 'Последняя';
		liNextP.textContent = '»';

		liLastP.addEventListener('click', () => {
			this.initPage(Math.ceil(Object.keys(this.source).length / this.productsOnPage));
			this.render(where, id, cart, this.page);
		});
		liNextP.addEventListener('click', () => {
			this.initPage(this.page+1);
			this.render(where, id, cart, this.page);
		});

		liNext.appendChild(liNextP);
		liLast.appendChild(liLastP);
		ul.appendChild(liNext);
		ul.appendChild(liLast);
		nav.appendChild(ul);
		return  nav;
	}

	fetchProducts (url) {
		return fetch (url)
			.then (
				(response) => {
					if (response.ok){
						return response.json()
					}
					throw new Error(`Network response was not ok.`);
				}
			)
			.then ((source) => {
				this.source = source;
			})
	}

	createPage (options) {

		(function checkUrl(url) {
			try {
				if(typeof url !== 'string'){
					throw new Error(`${this.name} error: 'url' must be string`)
				}
			} catch (e) {
				throw new Error(`${e.message}. 'url' is a required parameter`);
			}
		}.bind(this))(options['url']);

		(function checkWhere(where) {
			try {
				if (!(where instanceof Node && isNodeOfBody(where))){
					throw new Error(`${this.name} error: 'where' is not a node of Body. The document must have block to insert "main__products-list`)
				}
			} catch (e) {
				throw new Error(`${e.message}. 'where' is a required parameter`);
			}

			function isNodeOfBody(where){
				if (where.nodeName === 'BODY'){
					return true
				} else {
					if (where.parentNode){
						if (where.parentNode.nodeName === 'BODY'){
							return true
						} else {
							return isNodeOfBody(where.parentNode)
						}
					} else {
						return false;
					}
				}
			}
		}.bind(this))(options['where']);

		(function checkCart(cart) {
			try {
				if (!(cart instanceof Cart)){
					throw new Error(`${this.name} error: 'cart' is not a copy of Cart`)
				}
			} catch (e) {
				throw new Error(`${e.message}. 'cart' is a required parameter`);
			}
		}.bind(this))(options['cart']);

		(function checkProductsOnPage(productsOnPage) {
			try {
				if (parseInt(productsOnPage) === parseFloat(productsOnPage)){
					if (productsOnPage < 1) {
						this.productsOnPage = 1;
						console.log(new Error(`${this.name} error: min 'productsOnPage' must be 1}`));
					} else {
						this.productsOnPage = productsOnPage;
					}
				} else {
					throw new Error(`${this.name} error: 'productsOnPage' must be integer`);
				}
			} catch (e) {
				throw new Error(`${e.message}. 'productsOnPage' is a required parameter`);
			}
		}.bind(this))(options['productsOnPage']);

		(function checkProductsOnLine(productsOnLine) {
			try {
				if (parseInt(productsOnLine) === parseFloat(productsOnLine)){
					if (productsOnLine < 1) {
						this.productsOnLine = 1;
						console.log(new Error(`${this.name} error: min 'productsOnLine' must be 1}`));
					} else {
						this.productsOnLine = productsOnLine;
					}
				} else {
					throw new Error(`${this.name} error: 'productsOnLine' must be integer`);
				}
			} catch (e) {
				throw new Error(`${e.message}. 'productsOnPage' is a required parameter`);
			}
		}.bind(this))(options['productsOnLine']);

		this.fetchProducts (options['url'])
			.then (() => {

				this.initPage((function checkPage(page) {
					try {
						if (parseInt(page) === parseFloat(page)){
							if (page < 1) {
								console.log(new Error(`${this.name} error: min page must be 1}`));
								return 1;
							} else if (page <= Math.ceil(Object.keys(this.source).length / this.productsOnPage)){
								return page;
							} else {
								console.log(new Error(`${this.name} error: max page must be ${Math.ceil(Object.keys(this.source).length / this.productsOnPage)}`));
								return Math.ceil(Object.keys(this.source).length / this.productsOnPage);
							}
						} else {
							throw new Error(`${this.name} error: 'page' must be integer`);
						}
					} catch (e) {
						throw new Error(`${e.message}. 'page' is a required parameter`);
					}
				}.bind(this))(options['page']));

				(function checkId(id) {
					try {
						if (document.querySelector(`#${options['id']}`)) {
							throw new Error(`${this.name} error: 'id' '${options['id']}' has already used`)
						}
					} catch (e) {
						throw new Error(`${e.message}. 'id' is a required parameter`);
					}
				}.bind(this))(options['id']);

				this.render(options['where'], options['id'], options['cart'], options['page']);
			})
	}

	initPage (page) {
		this.products = [];
		this.page = page;
		for (let i = (this.page-1)*(this.productsOnPage); i < (this.page)*(this.productsOnPage); i++) {
			if (this.source[i]){
				this.createProduct(new Product({
					title: this.source[i].product_name,
					price: this.source[i].price,
					image: (() => {
						if (this.source[i].image) {
							return this.source[i].image
						} else {
							return 'images/item.png'
						}
					})()
				}));
			} else {
				return
			}
		}
	}

	totalCost () {
		return this.products.reduce((sum, elem) => {
			return sum += elem.price;
		}, 0)
	}
}