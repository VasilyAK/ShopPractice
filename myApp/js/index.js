import {SM1} from './shop/shop1/Shop1.js';
import {SM3} from './shop/shop3/Shop3.js';
import {cart3Vue} from './shop/shop3/Cart3.js';
import {products3Vue} from './shop/shop3/Products3.js';

export const SHOP3 = new Vue ({
	el: '#shop3',
	data: {
		cart: SM3.cart3,
		productList: SM3.productList3,
		search: SM3.search3,
		shop: {},
		nav: {
			isDis: {
				0: false,
				1: false,
				2: false,
				3: false
			},
			isAct: {
				0: false,
				1: false,
				2: false,
				3: false,
				4: false
			},
			val: {
				0: '',
				1: '',
				2: '',
				3: '',
				4: ''
			}
		}
	},

	components: {
		cart3Vue,
		products3Vue
	},

	methods: {
		goSearch: function () {
			console.log(`nen`);
			this.search.search()
		},

		renderPage (page) {
			this.shop.initPage(page);
			this.createNav(this.shop.pageNumber-2, this.shop.pageNumber+2, this.shop.pageNumber);
		},


		createNav: function (from, to, active) {
			//навигационная панель
			if (from < 1 ) {
				from = 1
			}
			if (to > Math.ceil(Object.keys(this.productList.source).length / this.shop.productsOnPage)){
				to = Math.ceil(Object.keys(this.productList.source).length / this.shop.productsOnPage)
			}

			if (from === active){
				this.nav.isDis['0'] = true;
				this.nav.isDis['1'] = true;
				this.nav.isAct['0'] = true;
			} else {
				this.nav.isDis['0'] = false;
				this.nav.isDis['1'] = false;
			}

			for (let j in this.nav.val) {
				if (this.nav.val.hasOwnProperty(j)){
					if (from === active) {
						this.nav.isAct[j] = true
					} else {
						this.nav.isAct[j] = false
					}
					this.nav.val[j] = from++
				}
			}

			if (to === active){
				this.nav.isDis['2'] = true;
				this.nav.isDis['3'] = true;
			} else {
				this.nav.isDis['2'] = false;
				this.nav.isDis['3'] = false;
			}
		}
	},

	mounted () {
		SM3.shop3(SM3.shop3Options)
			.then ((shop3)=> {
				this.shop = shop3
			})
				.then (() => {
					this.createNav (this.shop.pageNumber-2, this.shop.pageNumber+2, this.shop.pageNumber)
				})
	}
});