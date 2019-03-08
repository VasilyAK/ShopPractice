import {SM} from '../../SM/ShopMaker.js';

/* SM.createCart
	! @ name - имя новой поисковой строки
	! @ button - объект Node button открытия/закрытия корзины

	! обязательный
	*/
const cart1 = SM.createCart({
	name: 'cart1',
	button: document.querySelector('#cart1-button')
});

/* SM.createSearch
	! @ name - имя новой поисковой строки
	! @ input - объект Node input поисковой строки
	! @ button - объект Node button поисковой строки

	! обязательный
*/
const search1 = SM.createSearch({
	name: 'search1',
	input: document.querySelector('#search1-input'),
	button: document.querySelector('#search1-button'),
});

/* SM.createProductList
	! @ name - имя нового списка товаров
	! @ jsonDeclare - задание параметров каждого товара и путей для получения значения из json
	! @ url - путь до json файла

	! обязательный
 */
const productList1 = SM.createProductList({
	name: 'productList1',
	jsonDeclare: {
		category: 'product',
		type: 'items.type',
		producer: 'items.items.producer',
		id: 'items.items.items.id_product',
		price: 'items.items.items.price',
		pci: 'items.items.items.pci',
		ram: 'items.items.items.ram',
		serial: 'items.items.items.serial',
		equipment: 'items.items.items.equipment',
		image: 'items.items.items.image',

	},
	url: 'myApp/json/shop.json'
});



export const SM1 = {
	cart1: cart1,
	search1: search1,
	productList1: productList1,

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
				 продекларированные в jsonDeclare. Сама функция описывает блок продукта, который будет рендериться в интерфейс пользователя. Функция
				 должна возвращать блок-обертку для всех элементов. Для изменения стилей блоков расметки используйте идентификатор whereId и
				 его nth-child

			! обязательный
		*/
	shop1: SM.createShop({
		name: 'shop1',
		where: document.querySelector('#main1'),
		whereId: 'shop1-main-items',
		productList: productList1,
		cart: cart1,
		search: search1,
		pageNumber: 1,
		productsOnPage: 6,
		productsOnLine: 3,
		productBlock: function (pp) {
			return `<div class="shop1-main-items__item">
				<div class="shop1-main-items__item-img-block">
					<img class="shop1-main-items__item-img" src="${pp.image}" alt="">
				</div>
				<p class="shop1-main-items__item-title">id: ${pp.id}</br>product: ${pp.category}</br>type: ${pp.type}</br>serial: ${pp.serial}</br>price: 
${pp.price}</p>
				<button class="shop1-main-items__item-btn-add product-btn">Добавить</button>				
			</div>`
		}
			/*function (pp) {
			const item = document.createElement('div');
			item.setAttribute('class', 'main-products-list__item');

			const imgBlock = document.createElement('div');
			imgBlock.setAttribute('class', 'main-products-list__item-img-block');

			const img = document.createElement('img');
			img.setAttribute('class', 'main-products-list__item-img');
			img.setAttribute('src', pp.image);

			const title = document.createElement('p');
			title.setAttribute('class', 'main-products-list__item-title');
			title.innerHTML = `id: ${pp.id}</br>product: ${pp.product}</br>type: ${pp.type}</br>serial: ${pp.serial}</br>price: ${pp.price}`;

			const btnAdd = document.createElement('button');
			btnAdd.setAttribute('class', 'main-products-list__item-btn-add product-btn');
			btnAdd.textContent = 'Добавить';
			btnAdd.addEventListener('click', () => {this.cart.addCartProduct(pp)});

			imgBlock.appendChild(img);
			item.appendChild(imgBlock);
			item.appendChild(title);
			item.appendChild(btnAdd);
			return item;
		}*/
	})
};