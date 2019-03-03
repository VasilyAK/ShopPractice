import ProductListContainer from './modules/ProductListContainer.js';
import CartContainer from './modules/CartContainer.js';
import SearchContainer from './modules/SearchContainer.js';
import ShopContainer from './modules/ShopContainer.js';

// Shop Maker
export const SM = {
plc: new ProductListContainer(),
cc: new CartContainer(),
sc: new SearchContainer(),
shc: new ShopContainer()
};