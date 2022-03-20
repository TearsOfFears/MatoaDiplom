import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  showLoading:true,
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
    case productsTypes.LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: action.payload
      }
    default:
      return state;
  }
}
export default productsReducer