import {combineReducers} from 'redux'

import ordersReducer from './Orders/orders.reducer';
import userReducer from './User/user.reducer';
import productsReducer  from './Products/products.reducer'
import cartReducer from './Carts/cart.reducer';
import homeReducer from './Home/home.reducer';
import newsReducer from './News/news.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const rootReducer =  combineReducers({
    user:userReducer,
    productsData:productsReducer,
    cartData:cartReducer,
    ordersData:ordersReducer,
    contentHome:homeReducer,
    newsData:newsReducer,
})


const configStorage = {
    key:"root",
    storage,
    whitelist:['cartData']
}

export default persistReducer(configStorage, rootReducer);