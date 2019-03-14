import {shop1} from './shop/shop1/Shop1.js';
import {shop3} from './shop/shop3/Shop3.js';
import {cart3Vue} from './shop/shop3/Cart3.js';
import {products3Vue} from './shop/shop3/Products3.js';
import {shopNav3Vue} from './shop/shop3/ShopNav3.js';
import {search3Vue} from './shop/shop3/Search3.js';

export const SHOP3 = new Vue ({
	el: '#shop3',
	data: {
		isCart: false,
		isSearch: false,
		searchText: '',
		shop: {}
	},

	components: {
		cart3Vue,
		products3Vue,
		shopNav3Vue,
		search3Vue
	},

	methods: {
		goSearch: function (text) {
			if (text.length > 0) {
				this.isSearch = true;
			} else {
				this.isSearch = false;
			}
			Vue.set(this.shop.search, 'map', this.shop.search.search(text))
		},

		showCart: function () {
			this.isCart = !this.isCart
		}
	},

	mounted () {
		shop3
			.then ((shop3)=> {
				Vue.set (this, 'shop', shop3);
			})
				.then (() => {
					this.$refs.shopNav.createNav (this.shop.pageNumber-2, this.shop.pageNumber+2, this.shop.pageNumber)
				})
	}
});