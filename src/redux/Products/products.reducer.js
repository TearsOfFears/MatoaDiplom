import productsTypes from "./products.types";


const INITIAL_STATE={
    products:[]
}

const productsReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case productsTypes.SET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
            }
            case productsTypes.SET_CURRENT_PRODUCT:
                return{
                    ...state,
                    product: action.payload,
                }
                case productsTypes.SET_PRODUCT_DESC:
                return{
                    ...state,
                    product: action.payload,
                }
        default:
            return state;
    }
}
export default productsReducer