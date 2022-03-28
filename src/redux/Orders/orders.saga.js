import ordersTypes from "./orders.types";
import {takeLatest,put,all,call, take} from 'redux-saga/effects'
import { handleSaveOrder,handleGetUserOrderHistory, handleGetOrder } from "./orders.helpers";

import { auth } from "../../firebase/utils"; 
import { clearCart, } from "./../Carts/cart.actions";
import {setOrderDetailsStart, setUserOrderHistory } from "./orders.actions";



export function * getOrderDetailsStart({payload}){
    try{
        const order = yield handleGetOrder(payload);
        yield put(setOrderDetailsStart(order));
    }catch(err){
        //console.log(err);
    }
}


export function * onGetOrderDetailsStart(){
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START,getOrderDetailsStart)
}


export function* getUserOrderHistoryStart({payload}){
    try{
        const history = yield handleGetUserOrderHistory(payload)
        yield put(setUserOrderHistory(history));
        
    }catch(err){
        console.log(err);
    }
}

export function * onGetUserOrderHistoryStart(){
        yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY,getUserOrderHistoryStart)
}


export function* saveOrderHistoryStart({payload}){
        try{
            const timestamp = new Date();
            yield handleSaveOrder({
                ...payload,
                orderUserID:`${auth.currentUser.displayName}-${auth.currentUser.uid}`,
                orderCreated:timestamp
            });
            yield put(clearCart())
        }catch(err){
            //console.log(err);
        }
}

export function * onSaveOrderHistoryStart(){
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START,saveOrderHistoryStart)
}

export default function * ordersSagas() {
    yield all([call(onSaveOrderHistoryStart),call(onGetUserOrderHistoryStart),call(onGetOrderDetailsStart)])
}