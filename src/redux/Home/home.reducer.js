import productsTypes from "./home.types";

const INITIAL_STATE = {
  contentProduct: [],
  contentTestimonals: []
}

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_CONTENT:
      return {
        ...state,
        contentProduct: action.payload
      }
    case productsTypes.SET_CONTENT_TESTIMONALS:
      return {
        ...state,
        contentTestimonals: action.payload
      }
    default:
      return state;
  }
}
export default homeReducer