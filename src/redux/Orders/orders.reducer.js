import { setAcivity } from "./orders.helpers";
import ordersTypes from "./orders.types";

const INITIAL_STATE = {
    ordersHistory:[],
    orderDetails:{},
    isLoaded: false,
}
const ordersReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return{
                ...state,
                ordersHistory:action.payload,
                isLoaded: true
            }
            case ordersTypes.SET_ORDER_DETAILS:
            return{
                ...state,
                orderDetails:action.payload,
                isLoaded: true
            };
            case ordersTypes.SET_LOADED_ORDERS:
                return {
                  ...state,
                  isLoaded: action.payload
                }
        default:
            return state;
    }
}


export default ordersReducer