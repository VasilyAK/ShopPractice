export const cart3Vue = Vue.component ('cart3', {
	template:
		`<div class='shop3_cart-block'>
			<div class='shop3_cart'>
				<p v-if="typeof shop.cart === 'object' && shop.cart.items.length === 0">Корзина пуста</p>
				<table v-if="typeof shop.cart === 'object' && shop.cart.items.length > 0" class='shop3_cart-items'>
					<tr>
						<th>Номер</th>
						<th>Название</th>
						<th>Категория</th>
						<th>Наименование</th>
						<th>Производитель</th>
						<th>PCI</th>
						<th>RAM</th>
						<th>Серийный номер</th>
						<th>Комплектация</th>
						<th>Количество</th>
						<th>Стоимость</th>
					</tr>
					<tr v-for="item in shop.cart.items">
						<td>{{item.id}}</td>
						<td>{{item.product.category}}</td>
						<td>{{item.product.type}}</td>
						<td>{{item.product.producer}}</td>
						<td>{{item.product.pci}}</td>
						<td>{{item.product.ram}}</td>
						<td>{{item.product.serial}}</td>
						<td>{{item.equipment}}</td>
						<td><button>+</button><p>{{item.quantity}}</p><button>-</button></td>
						<td>{{shop.cart.cost(item.id, item.product.price)}}</td>
					</tr>
					<tr>
						<td>Всего товаров:</td>
						<td></td>
					</tr>
					<tr>
						<td>На сумму:</td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>`,

	props: {
		shop: Object,
	}
});