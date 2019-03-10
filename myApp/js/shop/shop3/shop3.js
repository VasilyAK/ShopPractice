import {SM$V} from '../../SM/ShopMaker.js';

/* SM$V.createCart
	! @ name - имя новой поисковой строки

	! обязательный
	*/
const cart3 = SM$V.createCart({
	name: 'cart3'
});

/* SM$V.createSearch
	! @ name - имя новой поисковой строки

	! обязательный
*/
const search3 = SM$V.createSearch({
	name: 'search3'
});

/* SM$V.createProductList
	! @ name - имя нового списка товаров
	! @ jsonDeclare - задание параметров каждого товара и путей для получения значения из json
	! @ url - путь до json файла

	! обязательный
 */
const productList3 = SM$V.createProductList({
	name: 'productList3',
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


/* SM$v.createShop  - возвращает промисс с новым объектом shop
	! @ url - откуда будем делать запрос
	! @ productList - список всех товаров полученных из json
	  @ cart - с какой корзиной нужно связать
	  @ search - с каким поиском нужно связать
	! @ productsOnPage - сколько товаров отрисовать на странице

	! обязательный
*/
export const shop3 = SM$V.createShop({
	name: 'shop3',
	productList: productList3,
	cart: cart3,
	search: search3,
	productsOnPage: 5
});