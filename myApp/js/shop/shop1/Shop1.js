import {SM} from '../../SM/ShopMaker.js';
import {cart1} from './Cart1.js';
import {search1} from './Search1.js';
import {productList1} from './ProductList1.js';

/* SM.createShop  - возвращает промисс с новым объектом shop
	! @ url - откуда будем делать запрос
	! @ where - куда будем рисовать
	! @ whereId - идентификатор для нарисованного дива
	! @ productList - список всех товаров полученных из json
	  @ cart - с какой корзиной нужно связать
	  @ search - с каким поиском нужно связать
	! @ pageNumber - какую страницу отрисовать
	! @ productsOnPage - сколько товаров отрисовать на странице
	! @ productsOnLine - сколько товаров отрисовать на строке

	! @ productBlock - функция имеет обязательный параметр pp (Product Property), элементами которого являются свойства продукта,
		продекларированные в jsonDeclare и дополнительный index - идентификатор элемента на странице.
		Сама функция описывает блок продукта, который будет рендериться в интерфейс пользователя. Функция
		должна возвращать блок-обертку для всех элементов. Блок-обертка представляет из себя HTML код написанный по стандартам строки ES6.
		Для изменения стилей блоков расметки используйте идентификатор whereId и его nth-child

	  @ afterRender - массив функций, которые будут исполняться после каждой перерисовке блока товаров, например по клику на кнопке навигации

	  @ onLoad - массив функций, которые будут выполнены единожды, после создания объекта

	! обязательный
*/
export const shop1 = SM.createShop({
	name: 'shop1',
	where: document.querySelector('#main1'),
	whereId: 'shop1-main-items',
	productList: productList1,
	cart: cart1,
	search: search1,
	pageNumber: 1,
	productsOnPage: 5,
	productsOnLine: 5,
	productBlock: function (pp, index) {
		return `<div class="shop1-main-items__item">
			<div class="shop1-main-items__item-img-block">
				<img class="shop1-main-items__item-img" src="${pp.image}" alt="">
			</div>
			<p class="shop1-main-items__item-title">id: ${pp.id}</br>product: ${pp.category}</br>type: ${pp.type}</br>serial: ${pp.serial}</br>price: 
${pp.price}</p>
			<button class="shop1-main-items__item-btn-add product-btn" data-index="${index}">Добавить</button>				
		</div>`
	},
	afterRender: [
		function () {
			document.querySelectorAll('.shop1-main-items__item-btn-add').forEach(function (elem) {
				elem.addEventListener('click', function () {
					const index = elem.getAttribute('data-index');
					const product = shop1.cart.getProductByIndex(index);
					shop1.cart.addCartProduct(product);
					shop1.cart.render();
				});
			});
		}
	],
	onLoad: [
		function () {
			document.querySelector('#cart1-button').addEventListener('click', function () {
				if (shop1.cart.where.getAttribute('data-visible') === 'true') {
					shop1.cart.where.setAttribute('class', 'shop1__cart-block');
					shop1.cart.where.setAttribute('data-visible', 'false');
				} else {
					shop1.cart.where.setAttribute('class', 'shop1__cart-block shop1__cart-block-hide');
					shop1.cart.where.setAttribute('data-visible', 'true');
				}
			});

			if (shop1.cart.where.getAttribute('data-visible') === 'true') {
				shop1.cart.where.setAttribute('class', 'shop1__cart-block');
				shop1.cart.where.setAttribute('data-visible', 'false');
			} else {
				shop1.cart.where.setAttribute('class', 'shop1__cart-block shop1__cart-block-hide');
				shop1.cart.where.setAttribute('data-visible', 'true');
			}

			shop1.cart.render();
		},

		function () {
			document.querySelector('#search1-input').addEventListener('input', function () {
				shop1.search.search();
				shop1.search.render();
			});
		}
	]
});

/* Использованные методы:

	shop.cart.getProductByIndex(index) - находит по индексу товар

	shop.cart.addCartProduct(product) - добавляет товар в корзину

	shop.render() - отрисовывает товары в элементе where

	shop.cart.render() - отрисовывает корзину в элементе cart.where

	shop.search.render() - отрисовывает результаты поиска в элементе search.where

*/