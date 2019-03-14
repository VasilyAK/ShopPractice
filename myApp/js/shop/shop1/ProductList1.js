import {SM} from '../../SM/ShopMaker.js';

/* SM.createProductList
	! @ name - имя нового списка товаров
	! @ jsonDeclare - задание параметров каждого товара и путей для получения значения из json: парсится алгоритмом
	! @ url - путь до json файла

	! обязательный
 */
export const productList1 = SM.createProductList({
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