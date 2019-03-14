export default class CommonMethods {
	constructor (options) {
		if (options) {
			if (!(options['mod'] && options['mod'] === 'VUE')) {
				Object.defineProperties(this, {
					'afterRender': {
						value: CommonMethods.newProperty(options, 'afterRender', [], 'object', CommonMethods.checkAfterRender),
						configurable: false,
						enumerable: true,
						writable: true
					},

					'onLoad': {
						value: CommonMethods.newProperty(options, 'onLoad', [], 'object', CommonMethods.checkOnLoad),
						configurable: false,
						enumerable: true,
						writable: true
					}
				})
			}
		}
	}

	static newProperty (options, property, returnDefault, type, addVerification) { //обрабатывает свойства классов
		if (options) {
			if (options[property]) {
				if (type && typeof options[property] !== type) {
					throw new Error(`Type of ${options[property]} is not ${type}`)
				}
				if (addVerification && typeof addVerification === 'function'){
					return addVerification(options[property], options['name'])
				} else {
					return options[property]
				}
			}
		}
		if (returnDefault instanceof Error){
			throw returnDefault
		} else {
			return returnDefault
		}
	}

	static checkWhere (where, name) {
		try {
			if (!(where instanceof Node /*&& isNodeOfBody(where)*/)){
				throw new Error(`${name} error: 'where' is not a node of Body. The document must have block to insert "main__products-list`)
			} else {
				return where;
			}
		} catch (e) {
			throw new Error(`${e.message}. 'where' is a required parameter`);
		}

		function isNodeOfBody(where){
			if (where.nodeName === 'BODY'){
				return true
			} else {
				if (where.parentNode){
					if (where.parentNode.nodeName === 'BODY'){
						return true
					} else {
						return isNodeOfBody(where.parentNode)
					}
				} else {
					return false;
				}
			}
		}
	}

	static checkAfterRender (afterRender, name) {
		try {
			if (afterRender instanceof Array) {
				for (let i = 0; i < afterRender.length; i++) {
					if (typeof afterRender[i] !== "function") {
						throw new Error(`In ${name} each of 'afterRender must be function`)
					}
				}
				return afterRender;
			} else {
				throw new Error(`In ${name} 'afterRender' must be copy of Array`)
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	static checkOnLoad (onLoad, name) {
		try {
			if (onLoad instanceof Array) {
				for (let i = 0; i < onLoad.length; i++) {
					if (typeof onLoad[i] !== "function") {
						throw new Error(`In ${name} each of 'afterRender must be function`)
					}
				}
				return onLoad;
			} else {
				throw new Error(`In ${name} 'afterRender' must be copy of Array`)
			}
		} catch (e) {
			throw new Error(`${e.message}`);
		}
	}

	identity (obj){ // метод сравнивает объекты по их свойствам, причем соответствующим одному уровню вложения + по конструкторам
		function identCircle (obj1, obj2, level1, level2){
			if (typeof obj1 === 'object'){
				circle1: for(let i in obj1){
					if (typeof obj2 === 'object'){
						for (let j in obj2){
							if (identCircle (obj1[i], obj2[j], level1+1, level2+1)){
								continue circle1
							}
						}
						return false
					} else {
						if (identCircle (obj1[i], obj2, level1+1, level2)){
							return true
						}
					}
				}
				return true
			} else {
				if (typeof obj2 === 'object') {
					for (let j in obj2){
						if (identCircle(obj1, obj2[j], level1, level2+1)){
							return true
						}
					}
					return false
				} else {
					return obj1 === obj2 && level1 === level2
				}
			}
		}
		return identCircle(this, obj, 0, 0) && identCircle(obj, this, 0, 0) && this.constructor === obj.constructor
	} // пришлось выкручиваться так, потому что в задании нет пункта id товара, хотя он есть в передаваемом json

	afterRenderInit () {
		if (this.afterRender) {
			for (let i = 0; i < this.afterRender.length; i++) {
				this.afterRender[i].call(this);
			}
		}
	}

	onLoadInit () {
		if (this.onLoad) {
			for (let i = 0; i < this.onLoad.length; i++) {
				this.onLoad[i].call(this);
			}
		}
	}
}