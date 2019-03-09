export const products3Vue = Vue.component ('products3', {

	template:
		`<div v-if="shop.hasOwnProperty('page')" class="shop3-main-items__item-block">
			<div v-for="item in shop.page"  class="shop3-main-items__item">
					<div class="shop3-main-items__item-img-block">
						<img class="shop3-main-items__item-img" v-bind:src="item.image" alt="">
					</div>
					<p>id: {{item.id}}</br>product: {{item.category}}</br>type: {{item.type}}</br>serial: {{item.serial}}</br>price: {{item.price}}</p>
					<button v-on:click="addToCart(item)" class="shop3-main-items__item-btn-add product-btn">Добавить</button>				
			</div>
			
			<div v-for="item in shop.cart.items">
				<p>{{item.id}}</p></br>
			</div>
		</div>`,

	props: {
		shop: Object,
	},

	methods: {
		addToCart: function (product) {
			const opt = this.shop.cart.addCartProduct(product);
			this.shop.cart.items.splice(opt.index, 1, opt.value);
		}
	}
});