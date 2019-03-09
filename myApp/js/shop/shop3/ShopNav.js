export const shopNav3Vue = Vue.component ('shop-nav', {
	data () {
		return {
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

				isVis: {
					0: true,
					1: true,
					2: true,
					3: true,
					4: true
				},

				val: {
					0: '',
					1: '',
					2: '',
					3: '',
					4: ''
				}
			}
		}
	},

	template:
		`<div class="shop3-main-items__nav">
			<ul class="pagination">
				<li class="page-item" v-bind:class="{disabled: nav.isDis['0']}" v-on:click="renderPage(1)"><span class="page-link">Первая</span></li>
				<li class="page-item" v-bind:class="{disabled: nav.isDis['1']}" v-on:click="renderPage(shop.pageNumber-1)"><span class="page-link">&laquo;</span></li>
				<li class="page-item" v-bind:class="{active: nav.isAct['0']}" v-on:click="renderPage(nav.val['0'])" v-if="nav.isVis['0']"><span class="page-link">{{nav.val['0']}}</span></li>
				<li class="page-item" v-bind:class="{active: nav.isAct['1']}" v-on:click="renderPage(nav.val['1'])" v-if="nav.isVis['1']"><span class="page-link">{{nav.val['1']}}</span></li>
				<li class="page-item" v-bind:class="{active: nav.isAct['2']}" v-on:click="renderPage(nav.val['2'])" v-if="nav.isVis['2']"><span class="page-link">{{nav.val['2']}}</span></li>
				<li class="page-item" v-bind:class="{active: nav.isAct['3']}" v-on:click="renderPage(nav.val['3'])" v-if="nav.isVis['3']"><span class="page-link">{{nav.val['3']}}</span></li>
				<li class="page-item" v-bind:class="{active: nav.isAct['4']}" v-on:click="renderPage(nav.val['4'])" v-if="nav.isVis['4']"><span class="page-link">{{nav.val['4']}}</span></li>
				<li class="page-item" v-bind:class="{disabled: nav.isDis['2']}" v-on:click="renderPage(shop.pageNumber+1)"><span class="page-link">&raquo;</span></li>
				<li class="page-item" v-bind:class="{disabled: nav.isDis['3']}" v-on:click="renderPage(Math.ceil(shop.productList.source.length / shop.productsOnPage))"><span class="page-link">Последняя</span></li>
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
				this.nav.isDis['0'] = true;
				this.nav.isDis['1'] = true;
				this.nav.isAct['0'] = true;
			} else {
				this.nav.isDis['0'] = false;
				this.nav.isDis['1'] = false;
			}

			for (let j = 0; j < 5; j++) {
				if (from === active) {
					this.nav.isAct[j] = true
				} else {
					this.nav.isAct[j] = false
				}
				if (from > to) {
					this.nav.isVis[j] = false
				} else {
					this.nav.isVis[j] = true
				}
				this.nav.val[j] = from++
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

	props: {
		shop: 'Object'
	}
});