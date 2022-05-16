import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createSagaMiddle from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import persistStore from 'redux-persist/es/persistStore';

const sagaMiddleware = createSagaMiddle();



export const middleWares= [sagaMiddleware,logger];

export const store = createStore(rootReducer,applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

export default {store,persistor};
