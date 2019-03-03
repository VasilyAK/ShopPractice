import CommonMethods from './CommonMethods.js';

export default class ProductList extends CommonMethods{
	constructor (options) {
		super();
		Object.defineProperties(this, {
			'name': {
				value: ProductList.newProperty(options, 'name', new Error('"name" is necessary property'), 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'jsonDeclare': {
				value: ProductList.newProperty(options, 'jsonDeclare', {}, 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'url': {
				value: ProductList.newProperty(options, 'url', '', 'string'),
				configurable: false,
				enumerable: true,
				writable: false
			},

			'source': {
				value: ProductList.newProperty(options, 'source', [], 'object'),
				configurable: false,
				enumerable: true,
				writable: false
			}
		});
	}

	fetchSource () {
		return fetch (this.url)
		.then (
			(response) => {
				if (response.ok){
					return response.json()
				}
				throw new Error(`Network response was not ok.`);
			}
		)
		.then ((serverSource) => {
			this.jsonDeclareParse (serverSource);
		})
	}

	jsonDeclareParse (serverSource) {
		let gl; // Groupe Line
		let us = []; // Unparsed Source
		(function createUS (serverSource, jsonDeclare, pathValue) { // собирает в один массив все элемены из serverSource указанные в jsonDeclare,
			// ставит метки для групп
			let path = pathValue;
			for (let i in serverSource) {
				if (serverSource.hasOwnProperty(i)){
					if (!(serverSource instanceof Array)){
						path.push(i);
					}
					if (typeof serverSource[i] === 'object') {
						createUS(serverSource[i], jsonDeclare, path);
						if (serverSource instanceof Array){
							us.push(path.length);
							if (!gl || gl > path.length){
								gl = path.length;
							}
						}
					} else {
						for (let j in jsonDeclare) {
							if (jsonDeclare.hasOwnProperty(j)) {
								if (path.join('.') === jsonDeclare[j]) {
									us.push({
										name: j,
										value: serverSource[i]
									});
									break;
								}
							}
						}
					}
					if (!(serverSource instanceof Array)){
						path.pop();
					}
				}
			}
		})(serverSource, this.jsonDeclare, []);

		let psci = 0; // Parsed Source Count Item
		let ps = []; // Parsed Source
		ps.push([]);
		for (let i = 0; i < us.length; i++) { //собирает в массив группы, выделенные в предыдущей функции
			if (typeof gl === 'number' && us[i] === gl && i !== us.length-1){
				ps.push([]);
				psci++;
			} else {
				if (typeof us[i] !== 'number') {
					ps[psci].push(us[i])
				}
			}
		}

		let fs = []; // Filtered Source
		for (let i in ps) { // разбивает группы на подгруппы по соответствующим name
			if (ps.hasOwnProperty(i)) {
				fs[i] = [];
				for (let j in this.jsonDeclare) {
					if (this.jsonDeclare.hasOwnProperty(j)) {
						fs[i].push(ps[i].filter((item) => {
							return item.name === j;
						}))
					}
				}
			}
		}

		let sci = 0; // Source Count Item
		for (let i = 0; i < fs.length; i++) { // собирает из подгрупп объекты, указанные в jsonDeclare
			let maxLenght = 0;
			for (let j = 0; j < fs[i].length; j++){
				if (fs[i][j].length > maxLenght) {
					maxLenght = fs[i][j].length;
				}
			}

			for (let k = 0; k < maxLenght; k++) {
				this.source[sci+k] = {};
				val: for (let val in this.jsonDeclare) {
					if (this.jsonDeclare.hasOwnProperty(val)) {
						for (let n = 0; n < fs[i].length; n++){
							if (fs[i][n][k % (fs[i][n].length)]['name'] === val){
								this.source[sci+k][val] = fs[i][n][k % (fs[i][n].length)]['value'];
								continue val
							}
						}
					}
				}
			}
			sci += maxLenght;
		}
	}
	/*
	totalCost () {
		return this.products.reduce((sum, elem) => {
			return sum += elem.price;
		}, 0)
	}
	*/
}