import {createStore,applyMiddleware} from 'redux'

import logger from 'redux-logger'
import rootReducer from './rootReducer';

export const middleWares= [logger];

export const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
