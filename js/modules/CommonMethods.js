export default class CommonMethods {
	static newProperty (options, property, returnDefault, type) { //обрабатывает свойства классов
		if (options && options[property]){
			if (type && typeof options[property] !== type){
				throw new Error(`Type of ${options[property]} is not ${type}`)
			}
			return options[property]
		}
		if (returnDefault instanceof Error){
			throw returnDefault
		} else {
			return returnDefault
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
}