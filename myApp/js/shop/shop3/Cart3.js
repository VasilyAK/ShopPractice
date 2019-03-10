export const cart3Vue = Vue.component ('cart3', {
	template:
		`<div v-if="isCart" class='shop3__cart-block'>
			<div class='shop3__cart'>
				<p v-if="typeof shop.cart === 'object' && shop.cart.items.length === 0" class='shop3-cart__mess'>Корзина пуста</p>
				<table v-if="typeof shop.cart === 'object' && shop.cart.items.length > 0" class='shop3-cart__table'>
					<tr>
						<th>Номер</th>
						<th>Категория</th>
						<th>Название</th>
						<th>Производитель</th>
						<th>PCI</th>
						<th>RAM</th>
						<th>Серийный номер</th>
						<th>Комплектация</th>
						<th>Количество</th>
						<th>Стоимость</th>
						<th></th>
					</tr>
					<tr v-for="item in shop.cart.items">
						<td v-bind:key="item.id">{{item.id}}</td>
						<td v-bind:key="item.product.category">{{item.product.category}}</td>
						<td v-bind:key="item.product.type">{{item.product.type}}</td>
						<td v-bind:key="item.product.producer">{{item.product.producer}}</td>
						<td v-bind:key="item.product.pci">{{item.product.pci}}</td>
						<td v-bind:key="item.product.ram">{{item.product.ram}}</td>
						<td v-bind:key="item.product.serial">{{item.product.serial}}</td>
						<td v-bind:key="item.product.equipment">{{item.product.equipment}}</td>
						<td><div class="shop3-cart__table-quantity"><button v-on:click="addQuantity(item.id)">+</button><p v-bind:key="item.quantity">{{item.quantity}}</p><button v-on:click="reduceQuantity(item.id)">-</button></div></td>
						<td v-bind:key="shop.cart.cost(item.id, 'price')">{{shop.cart.cost(item.id, 'price')}}</td>
						<td><button v-on:click="removeCartProduct(item.id)" class="shop3-cart__table-btn-del">Удалить</button></td>
					</tr>								
					<tr>
						<td colspan="10">
							<p v-bind:key="shop.cart.itemsCount()" class="shop3-cart__total-mess">Всего товаров: {{shop.cart.itemsCount()}}</p>
							<p v-bind:key="shop.cart.totalCost('price')" class="shop3-cart__total-mess">На сумму: {{shop.cart.totalCost('price')}}</p>
						</td>
						<td></td>
					</tr>
				</table>	
			</div>
		</div>`,

	props: {
		shop: 'Object',
		isCart: 'Boolean'
	},

	methods: {
		addQuantity: function(id) {
			for (let i in this.shop.cart.items) {
				if (this.shop.cart.items.hasOwnProperty(i) && this.shop.cart.items[i].id === id) {
					this.shop.cart.items[i].quantity++
				}
			}
		},

		reduceQuantity: function(id) {
			for (let i in this.shop.cart.items) {
				if (this.shop.cart.items.hasOwnProperty(i) && this.shop.cart.items[i].id === id) {
					if (--this.shop.cart.items[i].quantity === 0) {
						this.shop.cart.items.splice(this.shop.cart.removeCartProduct(id), 1);
						this.shop.cart.reId();
					}
				}
			}
		},

		removeCartProduct: function (id) {
			this.shop.cart.items.splice(this.shop.cart.removeCartProduct(id), 1);
			this.shop.cart.reId();
		}
	}
});