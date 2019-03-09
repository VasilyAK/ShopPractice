import CommonMethods from './CommonMethods.js';

export default class ProductList extends CommonMethods{
	constructor (options) {
		super();
		if (options['mod'] && options['mod'] === 'VUE') {
			this.name = ProductList.newProperty(options, 'name', new Error('"name" is necessary property'), 'string');
			this.jsonDeclare = ProductList.newProperty(options, 'jsonDeclare', {}, 'object');
			this.url = ProductList.newProperty(options, 'url', '', 'string');
			this.source = ProductList.newProperty(options, 'source', [], 'object')
		} else {
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

	jsonDeclareParse (serverSource) { // парсит иерархически выстроенные json
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
						if (serverSource instanceof Array){
							us.push(path.length);
							if (!gl || gl < path.length){
								gl = path.length;
							}
						}
						createUS(serverSource[i], jsonDeclare, path);
						if (serverSource instanceof Array){
							us.push(path.length);
							if (!gl || gl < path.length){
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

		// Parsed Source
		const ps = (function createPS (us, ps) {
			for (let i = 0; i < us.length; i++) { //собирает в массив группы, выделенные в предыдущей функции
				if (typeof gl === 'number' && us[i] === gl && i !== us.length-1){
					ps.push([]);
					i++;
					do {
						ps[ps.length-1].push(us[i])
					} while (us[++i] !== gl);
				} else {
					ps.push(us[i])
				}
			}
			if (gl-- > 0) {
				return createPS(ps, [])
			} else {
				return ps
			}
		})(us, []);

		let fs = []; // Filtered Source
		(function createFS (ps, fa) { // Filtered Source собирает из вложенных массивов заданные product
			ps.forEach((val) => {
				let count = 0;
				for (let i = 0; i < val.length; i++){
					if (!(val[i]['name'])) {
						fa.push([]);
						count++
					}
				}

				let pass = 0;

				circle1: for (let i = 0; i < fa.length; i++) {
					let countPass = 0;
					for (let j = 0; j < val.length; j++) {
						if (!(val[j]['name'])) {
							if (countPass === pass){
								for (let k = 0; k < val[j].length; k++) {
									fa[i].push(val[j][k]);
								}
								pass++;
								continue circle1
							} else {
								countPass++
							}
						} else {
							fa[i].push(val[j])
						}
					}
				}

				if (count > 0) {
					createFS (fa, []);
					fa = [];
				} else {
					fs.push(val)
				}
			})
		})(ps, []);

		fs.forEach((val) => { // преобразует fs в source (суть массивов одна, но разные представления)
			let sourceObj = {};
			val.forEach((obj) => {
				sourceObj[obj.name] = obj.value
			});
			this.source.push(sourceObj)
		});
	}
}