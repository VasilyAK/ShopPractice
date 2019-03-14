import {SM} from '../../SM/ShopMaker.js';

/* SM.createCart
	! @ name - имя новой поисковой строки
	! @ where - куда будем рисовать
	! @ cartBlock - функция имеет обязательный параметр cp (Cart Property), элементами которого являются свойства: id, product, quantity,
		product имеет свойства продекларированные в jsonDeclare.
		Дополнительный параметр index - номер элемента в корзине.

		Сама функция описывает блок продукта, который будет рендериться в интерфейс пользователя. Функция
		должна возвращать блок-обертку для всех элементов. Блок-обертка представляет из себя HTML код написанный по стандартам строки ES6.

		добавьте свойство repeat="cp" в тег - список элементов корзины

		через this можно обратиться к свойствам и методам объекта Cart

	! @ emptyCartBlock - аналогично cartBlock, за исключением: параметры отсутствуют, функция описывает состояние пустой корзины

	  @ afterRender - массив функций, которые будут исполняться после каждой перерисовке блока товаров, например по клику на кнопке навигации

	  @ onLoad - массив функций, которые будут выполнены единожды, после создания объекта

	! обязательный
	*/
export const cart1 = SM.createCart({
	name: 'cart1',
	where: document.querySelector('#cart1'),
	cartBlock: function (cp, index) {
		return `<div class='shop1__cart'>
			<table class='shop1-cart__table'>
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
					<tr repeat="cp">
						<td>${cp.id}</td>
						<td>${cp.product.category}</td>
						<td>${cp.product.type}</td>
						<td>${cp.product.producer}</td>
						<td>${cp.product.pci}</td>
						<td>${cp.product.ram}</td>
						<td>${cp.product.serial}</td>
						<td>${cp.product.equipment}</td>
						<td><div class="shop1-cart__table-quantity"><button data-index="${index}" data-val="add">+</button><p>${cp.quantity}</p><button data-index="${index}" data-val="rem">-</button></div></td>
						<td>${this.cost(cp.id, 'price')}</td>
						<td><button class="shop1-cart__table-btn-del" data-index="${index}" data-val="del">Удалить</button></td>
					</tr>						
				<tr>
					<td colspan="10">
						<p class="shop1-cart__total-mess">Всего товаров: ${this.itemsCount()}</p>
						<p class="shop1-cart__total-mess">На сумму: ${this.totalCost('price')}</p>
					</td>
				</tr>
			</table>	
		</div>`
	},
	emptyCartBlock: function () {
		return `<div class='shop1__cart'>
			<p class='shop1-cart__mess'>Корзина пуста</p>
		</div>`
	},
	afterRender: [
		function () {
			document.querySelectorAll('[data-val="add"]').forEach((btn) => {
				btn.addEventListener('click', () => {
					cart1.items[btn.getAttribute('data-index')].quantity++;
					cart1.render();
				})
			});
			document.querySelectorAll('[data-val="rem"]').forEach((btn) => {
				btn.addEventListener('click', () => {
					if (--cart1.items[btn.getAttribute('data-index')].quantity === 0) {
						cart1.removeCartProduct(cart1.items[parseInt(btn.getAttribute('data-index'))].id);
					}
					cart1.render();
				})
			});
			document.querySelectorAll('[data-val="del"]').forEach((btn) => {
				btn.addEventListener('click', () => {
					cart1.removeCartProduct(cart1.items[parseInt(btn.getAttribute('data-index'))].id);
					cart1.render();
				})
			})
		}
	]
});

/* Использованные методы:

	cart.itemsCount() - колличество элементов в корзине

	cart.totalCost('price') - общяа стоимость товаров корзины, параметр типа "string" - имя свойства товара
	 	(стоимость) продекларированного в jsonDeclare

	cart.removeCartProduct(id) - удаление товара из корзины, параметр id - идентификатор элемента корзины

	cart.render() - отрисовывает корзину в элементе where

*/