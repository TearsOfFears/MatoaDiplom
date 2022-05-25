import ordersTypes from "./orders.types";
import {
    takeLatest,
    put,
    all,
    call,
    delay
} from 'redux-saga/effects'
import {
    handleSaveOrder,
    handleGetUserOrderHistory,
    handleGetOrder,
    handleFetchOrderHistory,
    handleDeleteOrder,
    handleSetActivity
} from "./orders.helpers";

import {
    auth
} from "../../firebase/utils";
import {
    clearCart,
} from "./../Carts/cart.actions";
import {
    setLoadedOrders,
    setOrderDetailsStart,
    setUserOrderHistory
} from "./orders.actions";



export function* getOrderDetailsStart({
    payload
}) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(setOrderDetailsStart(order));
        yield delay(1000);
        yield put(setLoadedOrders(false))
    } catch (err) {
        //console.log(err);
    }
}


export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetailsStart)
}


export function* getUserOrderHistoryStart({
    payload
}) {
    try {
        const history = yield handleGetUserOrderHistory(payload)
        yield put(setUserOrderHistory(history));
        yield delay(1000);
        yield put(setLoadedOrders(false))
    } catch (err) {
        console.log(err);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY, getUserOrderHistoryStart)
}


export function* saveOrderHistoryStart({
    payload
}) {
    try {
        const timestamp = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: `${auth.currentUser.uid}`,
            orderCreated: timestamp
        });
        yield put(clearCart())
    } catch (err) {
        console.log(err);
    }
}

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrderHistoryStart)
}


export function* fetchOrders({payload}) {
    try {
        const orders = yield handleFetchOrderHistory(payload);
        yield put(setUserOrderHistory(orders))
    } catch (err) {
        console.log(err);
    }
}

export function* onGetOrdersHistory() {
    yield takeLatest(ordersTypes.FETCH_ORDERS_HISTORY, fetchOrders)
}



export function* deleteOrder({
    payload
}) {
    try {
        yield handleDeleteOrder(payload);
        yield put(handleFetchOrderHistory());
    } catch (err) {
        //console.log(err);
    }
}
export function* onDeleteOrder() {
    yield takeLatest(ordersTypes.DELETE_ORDER, deleteOrder)
}


export function* setAcivity({
    payload: {
        activityData, documentId
    }
  }) {
    try {
        yield handleSetActivity(activityData, documentId);
        yield put(handleFetchOrderHistory());
    } catch (err) {
        console.log(err);
    }
}
export function* onSetActivity() {
    yield takeLatest(ordersTypes.SET_ACTIVITY, setAcivity)
}

export default function* ordersSagas() {
    yield all([call(onSaveOrderHistoryStart), call(onGetUserOrderHistoryStart), call(onGetOrderDetailsStart), call(onGetOrdersHistory), call(onDeleteOrder),call(onSetActivity)])
}