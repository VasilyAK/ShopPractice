import {SM} from '../SM/ShopMaker.js';

export const shop2 = new Vue ({
	el: '#main2',
	data: {

	},
	mounted() {
		const cart2 = SM.createCart({
			name: 'cart2'
		});
		const search2 = SM.createSearch({
			name: 'search2',
			input: document.querySelector('#main-search-input2'),
			button: document.querySelector('#main-search-button2'),
		});

		// пример из методички
		const productList2 = SM.createProductList({
			name:'productList2',
			jsonDeclare: {
				id: 'id_product',
				price: 'price',
				title: 'product_name'
			},
			url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
		});

		const Shop2 = SM.createShop ({
			name: 'shop2',
			where: document.querySelector('#main2'),
			whereId: 'main__product-list2',
			productList: productList2,
			cart: cart2,
			search: search2,
			pageNumber: 1,
			productsOnPage: 2,
			productsOnLine: 3,
			productBlock: function (pp) {
				const item = document.createElement('div');
				item.setAttribute('class', 'main-products-list__item');

				const imgBlock = document.createElement('div');
				imgBlock.setAttribute('class', 'main-products-list__item-img-block');

				const img = document.createElement('img');
				img.setAttribute('class', 'main-products-list__item-img');
				img.setAttribute('src', 'images/item.png');

				const title = document.createElement('p');
				title.setAttribute('class', 'main-products-list__item-title');
				title.innerHTML = `${pp.title}</br>${pp.price} руб.`;

				const btnAdd = document.createElement('button');
				btnAdd.setAttribute('class', 'main-products-list__item-btn-add product-btn');
				btnAdd.textContent = 'Добавить';
				btnAdd.addEventListener('click', () => {this.cart.addCartProduct(pp)});

				imgBlock.appendChild(img);
				item.appendChild(imgBlock);
				item.appendChild(title);
				item.appendChild(btnAdd);
				return item;
			}
		});
	}
});