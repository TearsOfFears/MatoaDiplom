import ordersTypes from "./orders.types";

const INITIAL_STATE = {
    ordersHistory:[],
    orderDetails:{}
}
const ordersReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return{
                ...state,
                ordersHistory:action.payload
            }
            case ordersTypes.SET_ORDER_DETAILS:
            return{
                ...state,
                orderDetails:action.payload
            };
        default:
            return state;
    }
}


export default ordersReducer