export const search3Vue = Vue.component ('search3', {
	template:
		`<div v-if="isSearch" class='shop3__search-block'>
			<div class='shop3__search'>
				<p v-if="typeof shop.search === 'object' && shop.search.map.length === 0" class='shop3-search__mess'>Совпадений не найдено</p>
				<table v-if="typeof shop.search === 'object' && shop.search.map.length > 0" class='shop3-search__table'>
					<tr>
						<th>Номер</th>
						<th>Категория</th>
						<th>Название</th>
						<th>Производитель</th>
						<th>PCI</th>
						<th>RAM</th>
						<th>Серийный номер</th>
						<th>Комплектация</th>
						<th>Стоимость</th>
					</tr>
					<tr v-for="item in shop.search.map">
						<td v-if="item.productList === 'productList3'" v-bind:key="item.id">{{item.id}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.category">{{item.product.category}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.type">{{item.product.type}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.producer">{{item.product.producer}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.pci">{{item.product.pci}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.ram">{{item.product.ram}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.serial">{{item.product.serial}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.equipment">{{item.product.equipment}}</td>
						<td v-if="item.productList === 'productList3'" v-bind:key="item.product.price">{{item.product.price}}</td>
					</tr>
				</table>	
			</div>
		</div>`,

	props: {
		shop: 'Object',
		isSearch: 'Boolean'
	},

	methods: {

	}
});