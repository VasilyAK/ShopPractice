export const shopNav3Vue = Vue.component ('shop-nav', {
	data: function () {
		return {
			isDis: [],
			isAct: [],
			isVis: [],
			val: []
		}
	},

	template:
		`<div class="shop3-main-items__nav">
			<ul class="pagination">
				<li class="page-item" v-bind:class="{disabled: isDis[0]}" v-on:click="renderPage(1)"><span class="page-link">Первая</span></li>
				<li class="page-item" v-bind:class="{disabled: isDis[1]}" v-on:click="renderPage(shop.pageNumber-1)"><span class="page-link">&laquo;</span></li>
				<li class="page-item" v-bind:class="{active: isAct[0]}" v-on:click="renderPage(val[0])" v-if="isVis[0]"><span class="page-link" v-bind:key="val[0]">{{val[0]}}</span></li>
				<li class="page-item" v-bind:class="{active: isAct[1]}" v-on:click="renderPage(val[1])" v-if="isVis[1]"><span class="page-link" v-bind:key="val[1]">{{val[1]}}</span></li>
				<li class="page-item" v-bind:class="{active: isAct[2]}" v-on:click="renderPage(val[2])" v-if="isVis[2]"><span class="page-link" v-bind:key="val[2]">{{val[2]}}</span></li>
				<li class="page-item" v-bind:class="{active: isAct[3]}" v-on:click="renderPage(val[3])" v-if="isVis[3]"><span class="page-link" v-bind:key="val[3]">{{val[3]}}</span></li>
				<li class="page-item" v-bind:class="{active: isAct[4]}" v-on:click="renderPage(val[4])" v-if="isVis[4]"><span class="page-link" v-bind:key="val[4]">{{val[4]}}</span></li>
				<li class="page-item" v-bind:class="{disabled: isDis[2]}" v-on:click="renderPage(shop.pageNumber+1)"><span class="page-link">&raquo;</span></li>
				<li class="page-item" v-bind:class="{disabled: isDis[3]}" v-on:click="renderPage(Math.ceil(shop.productList.source.length / shop.productsOnPage))"><span class="page-link">Последняя</span></li>
			</ul>
		</div>`,

	methods: {
		renderPage (page) {
			this.shop.initPage(page);
			this.createNav(this.shop.pageNumber-2, this.shop.pageNumber+2, this.shop.pageNumber);
		},

		createNav: function (from, to, active) {
			//навигационная панель
			if (from < 1 ) {
				from = 1;
				to = 5
			}
			if (to > Math.ceil(this.shop.productList.source.length / this.shop.productsOnPage)){
				to = Math.ceil(this.shop.productList.source.length / this.shop.productsOnPage);
				from = to - 4
			}

			if (from === active){
				this.isDis.splice(0, 1, true);
				this.isDis.splice(1, 1, true);
				this.isAct.splice(0, 1, true);
			} else {
				this.isDis.splice(0, 1, false);
				this.isDis.splice(1, 1,false);
			}

			for (let j = 0; j < 5; j++) {
				if (from === active) {
					this.isAct.splice(j, 1, true)
				} else {
					this.isAct.splice(j, 1, false)
				}
				if (from > to) {
					this.isVis.splice(j, 1, false)
				} else {
					this.isVis.splice(j, 1, true)
				}
				this.val.splice(j, 1, from++)
			}

			if (to === active){
				this.isDis.splice(2, 1, true);
				this.isDis.splice(3, 1, true);
			} else {
				this.isDis.splice(2, 1, false);
				this.isDis.splice(3, 1, false);
			}
		}
	},

	props: {
		shop: 'Object'
	}
});