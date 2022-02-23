import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createSagaMiddle from 'redux-saga'

import persistStore from 'redux-persist/es/persistStore';

const sagaMiddleware = createSagaMiddle();

// const reduxDevTools = ()=>(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export const middleWares= [sagaMiddleware,logger];

export const store = createStore(rootReducer,applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

export default {store,persistor};
