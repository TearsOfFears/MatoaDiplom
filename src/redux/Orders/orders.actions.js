import ordersTypes from "./orders.types";


export const saveOrderHistory = order =>({
    type:ordersTypes.SAVE_ORDER_HISTORY_START,
    payload:order
})

export const getUserOrderHistory = uid =>({
    type:ordersTypes.GET_USER_ORDER_HISTORY,
    payload:uid
})

export const setUserOrderHistory = history =>({
    type:ordersTypes.SET_USER_ORDER_HISTORY,
    payload:history
})


export const getOrderDetailsStart = orderID =>({
    type:ordersTypes.GET_ORDER_DETAILS_START,
    payload:orderID
})

export const setOrderDetailsStart = order =>({
    type:ordersTypes.SET_ORDER_DETAILS,
    payload:order
})

export const fetchOrdersHistory = orders =>({
    type:ordersTypes.FETCH_ORDERS_HISTORY,
    payload:orders
})

export const deleteOrder = orderID =>({
    type:ordersTypes.DELETE_ORDER,
    payload:orderID
})

export const setActivity = (activity)=>({
    type:ordersTypes.SET_ACTIVITY,
    payload:activity
})