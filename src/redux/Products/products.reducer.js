import productsTypes from "./products.types";

const INITIAL_STATE = {
  product:{},
  products: [],
  randomProducts:[],
  showLoading:true,
  showLoadingCurrentProduct:true,
}

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case productsTypes.SET_CURRENT_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
      case productsTypes.SET_RANDOM_PRODUCTS:
        return {
          ...state,
          randomProducts: action.payload
        }
    case productsTypes.LOADING_TOGGLE_ACTION_PRODUCTS:
      return {
        ...state,
        showLoading: action.payload
      }
      case productsTypes.LOADING_TOGGLE_ACTION_CURRENT_PRODUCTS:
      return {
        ...state,
        showLoadingCurrentProduct: action.payload
      }
    default:
      return state;
  }
}
export default productsReducer