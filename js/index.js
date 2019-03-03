import {SM} from './shopEngine.js';
import Shop from './modules/Shop.js';
import ProductList from './modules/ProductList.js';
import Cart from './modules/Cart.js';
import Search from './modules/Search.js';

/*
	пока не проработал
*/
const cart = SM.cc.createCart(new Cart ({
	name: 'mainCart'
}));

/*
	! @ name - имя нового списка товаров
	! @ input - объект Node input поисковой строки
	! @ button - объект Node button поисковой строки

	! обязательный
 */


const search = SM.sc.createSearch(new Search({
	name: 'mainSearch',
	input: document.querySelector('#main-search-input'),
	button: document.querySelector('#main-search-button'),
}));

const main1 = new Vue ({
	el: '#main1',
	data: {

	},
	mounted() {
		/*
			! @ name - имя нового списка товаров
			! @ jsonDeclare - задание параметров каждого товара и путей для получения значения из json
			! @ url - путь до json файла

			! обязательный
		 */
		const productList1 = SM.plc.createProductList(new ProductList({
			name: 'productList1',
			jsonDeclare: {
				id: 'items.id_product',
				price: 'items.price',
				title: 'items.product_name',
				image: 'items.image',
				type: 'type'
			},
			url: 'json/shop.json'
		}));
		/*
			! @ url - откуда будем делать запрос
			! @ where - куда будем рисовать
			! @ whereId - идентификатор для нарисованного дива
			! @ productList - список всех товаров полученных из json
			  @ cart - с какой корзиной нужно связать
			  @ search - с каким поиском нужно связать
			! @ pageNumber - какую страницу отрисовать
			! @ productsOnPage - сколько товаров отрисовать на странице
			! @ productsOnLine - сколько товаров отрисовать на строке

			! @ productBlock - функция имеет обязательный параметр productBlock, элементами которого являются свойства продукта,
			 продекларированные в jsonDeclare. Сама функция описывает блок продукта, который будет рендериться в интерфейс пользователя. Функция
			  должна возвращать блок-обертку для всех элементов.

			! обязательный
		*/
		const Shop1 = SM.shc.createShop (new Shop ({
			name: 'shop1',
			where: document.querySelector('#main1'),
			whereId: 'main__product-list1',
			productList: productList1,
			cart: cart,
			search: search,
			pageNumber: 1,
			productsOnPage: 6,
			productsOnLine: 6,
			productBlock: function (productBlock) {
				const item = document.createElement('div');
				item.setAttribute('class', 'main-products-list__item');

				const imgBlock = document.createElement('div');
				imgBlock.setAttribute('class', 'main-products-list__item-img-block');

				const img = document.createElement('img');
				img.setAttribute('class', 'main-products-list__item-img');
				img.setAttribute('src', productBlock.image);

				const title = document.createElement('p');
				title.setAttribute('class', 'main-products-list__item-title');
				title.innerHTML = `${productBlock.title}</br>${productBlock.price} руб.`;

				const btnAdd = document.createElement('button');
				btnAdd.setAttribute('class', 'main-products-list__item-btn-add product-btn');
				btnAdd.textContent = 'Добавить';
				btnAdd.addEventListener('click', () => {this.cart.addCartProduct(productBlock)});

				imgBlock.appendChild(img);
				item.appendChild(imgBlock);
				item.appendChild(title);
				item.appendChild(btnAdd);
				return item;
			}
		}));
	}
});

const main2 = new Vue ({
	el: '#main2',
	data: {

	},
	mounted() {
		// пример из методички
		const productList2 = SM.plc.createProductList(new ProductList({
			name:'productList2',
			jsonDeclare: {
				id: 'id_product',
				price: 'price',
				title: 'product_name'
			},
			url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
		}));

		const Shop2 = SM.shc.createShop (new Shop ({
			name: 'shop2',
			where: document.querySelector('#main2'),
			whereId: 'main__product-list2',
			productList: productList2,
			cart: cart,
			search: search,
			pageNumber: 1,
			productsOnPage: 2,
			productsOnLine: 6,
			productBlock: function (productBlock) {
				const item = document.createElement('div');
				item.setAttribute('class', 'main-products-list__item');

				const imgBlock = document.createElement('div');
				imgBlock.setAttribute('class', 'main-products-list__item-img-block');

				const img = document.createElement('img');
				img.setAttribute('class', 'main-products-list__item-img');
				img.setAttribute('src', 'images/item.png');

				const title = document.createElement('p');
				title.setAttribute('class', 'main-products-list__item-title');
				title.innerHTML = `${productBlock.title}</br>${productBlock.price} руб.`;

				const btnAdd = document.createElement('button');
				btnAdd.setAttribute('class', 'main-products-list__item-btn-add product-btn');
				btnAdd.textContent = 'Добавить';
				btnAdd.addEventListener('click', () => {this.cart.addCartProduct(productBlock)});

				imgBlock.appendChild(img);
				item.appendChild(imgBlock);
				item.appendChild(title);
				item.appendChild(btnAdd);
				return item;
			}
		}));
	}
});
/*
const main3 = new Vue ({
	el: '#main3',
	data: {

	},
	mounted() {

	}
})
*/