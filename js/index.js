import {plc} from './shopEngine.js';
import {cc} from './shopEngine.js';
import ProductList from './modules/ProductList.js';
import Cart from './modules/Cart.js';

const main1 = new Vue ({
	el: '#main1',
	data: {

	},
	mounted() {
		const firstProductList = plc.createProductList(new ProductList({
			name:'firstProductList1'
		}));
		const cart = cc.createCart(new Cart ({
			name: 'mainCart'
		}));
		/*
			@ url - откуда будем делать запрос
			@ where - куда будем рисовать
			@ id - идентификатор для нарисованного дива
			@ cart - с какой корзиной нужно связать
			@ page - какую страницу отрисовать
			@ productsOnPage - сколько товаров отрисовать на странице
			@ productsOnLine - сколько товаров отрисовать на строке
			все параметры обязательны
		*/
		firstProductList.createPage ({
			url: 'json/shop.json',
			where: document.querySelector('#main1'),
			id: 'main__products-list1',
			cart: cart,
			page: 1,
			productsOnPage: 5,
			productsOnLine: 5
		});
	}
});

const main2 = new Vue ({
	el: '#main2',
	data: {

	},
	mounted() {
		const firstProductList2 = plc.createProductList(new ProductList({
			name:'firstProductList2'
		}));
		const cart = cc.createCart(new Cart ({
			name: 'mainCart'
		}));

		firstProductList2.createPage ({
			url: 'json/shop.json',
			where: document.querySelector('#main2'),
			id: 'main__products-list2',
			cart: cart,
			page: 4,
			productsOnPage: 12,
			productsOnLine: 6
		});
	}
});

const main3 = new Vue ({
	el: '#main3',
	data: {

	},
	mounted() {
		const firstProductList3 = plc.createProductList(new ProductList({
			name:'firstProductList3'
		}));
		const cart = cc.createCart(new Cart ({
			name: 'mainCart'
		}));

		firstProductList3.createPage ({
			url: 'json/shop.json',
			where: document.querySelector('#main3'),
			id: 'main__products-list3',
			cart: cart,
			page: 7,
			productsOnPage: 4,
			productsOnLine: 2
		});
	}
});