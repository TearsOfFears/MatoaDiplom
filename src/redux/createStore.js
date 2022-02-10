import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './rootReducer';

export const middleWares= [thunk,logger];
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(rootReducer,applyMiddleware(...middleWares));

export default store;
