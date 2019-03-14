import {SM} from '../../SM/ShopMaker.js';

/* SM.createSearch
	! @ name - имя новой поисковой строки
	! @ where - куда будем рисовать
	! @ input - объект Node input поисковой строки
	! @ searchBlock - функция имеет обязательный параметр sp (Search Property), элементами которого являются свойства:
		 id,
		 productList - имя продукт листа, где было найдено совпадение,
		 productNode - позиция товара в продукт листе,
		 countMatches - количество совпадений,
		 product - имеет свойства продекларированные в jsonDeclare.

		Дополнительный параметр index - номер элемента в корзине.

		Сама функция описывает блок продукта, который будет рендериться в интерфейс пользователя. Функция
		должна возвращать блок-обертку для всех элементов. Блок-обертка представляет из себя HTML код написанный
		по стандартам строки ES6.

		добавьте свойство repeat="sp" в тег - список товаров в котоых найденны совпадения

		через this можно обратиться к свойствам и методам объекта Search

	! @ emptySearchBlock - аналогично searchBlock, за исключением: параметры отсутствуют, функция описывает состояние,
	когда совпадений не было найдено

	  @ afterRender - массив функций, которые будут исполняться после каждой перерисовке блока товаров, например по клику на кнопке навигации

	  @ onLoad - массив функций, которые будут выполнены единожды, после создания объекта

	! обязательный
*/
export const search1 = SM.createSearch({
	name: 'search1',
	where: document.querySelector('#search1'),
	input: document.querySelector('#search1-input'),
	searchBlock: function (sp, index) {
		return `<div class='shop1__search'>
			<table class='shop1-search__table'>
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
				<tr repeat="sp">
					<td>${sp.id}</td>
					<td>${sp.product.category}</td>
					<td>${sp.product.type}</td>
					<td>${sp.product.producer}</td>
					<td>${sp.product.pci}</td>
					<td>${sp.product.ram}</td>
					<td>${sp.product.serial}</td>
					<td>${sp.product.equipment}</td>
					<td>${sp.product.price}</td>
				</tr>
			</table>	
		</div>`
	},
	emptySearchBlock: function () {
		return `<div class='shop1__search'>
			<p class='shop1-search__mess'>Совпадений не найдено</p>
		</div>`
	},
	afterRender: [
		function () {
			if (search1.input.value === '') {
				search1.where.setAttribute('class', 'shop1__search-block shop1__search-block-hide')
			} else {
				search1.where.setAttribute('class', 'shop1__search-block')
			}
		}
	]
});