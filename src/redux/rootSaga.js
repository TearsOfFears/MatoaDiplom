import {all,call} from 'redux-saga/effects'

import userSagas from './User/user.sagas'
import productsSagas from './Products/products.saga'
import ordersSagas from './Orders/orders.saga'

export default function* rootSaga(){
    yield all([call(userSagas),call(productsSagas),call(ordersSagas)])
}