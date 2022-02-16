import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createSagaMiddle from 'redux-saga'

const sagaMiddleware = createSagaMiddle();

// const reduxDevTools = ()=>(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export const middleWares= [sagaMiddleware,logger];

export const store = createStore(rootReducer,applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

export default store;
