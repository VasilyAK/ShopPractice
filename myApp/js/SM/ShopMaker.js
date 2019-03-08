import ProductListContainer from './modules/ProductListContainer.js';
import CartContainer from './modules/CartContainer.js';
import SearchContainer from './modules/SearchContainer.js';
import ShopContainer from './modules/ShopContainer.js';
import SMVAK from './modules/SMVAK.js'

// Shop Maker
export const SM = new SMVAK ({
	plc: new ProductListContainer(),
	cc: new CartContainer(),
	sc: new SearchContainer(),
	shc: new ShopContainer()
});

// Shop Maker для Vue
export const SM$V = new SMVAK ({
	plc: new ProductListContainer({mod: 'VUE'}),
	cc: new CartContainer({mod: 'VUE'}),
	sc: new SearchContainer({mod: 'VUE'}),
	shc: new ShopContainer({mod: 'VUE'})
});

