import homeTypes from "./home.types";

const INITIAL_STATE = {
  contentProduct: [],
  contentTestimonals: [],
  contentInstagram:[],
  contentSeries:[],
  contentEdit: [],
  images:[],
  showLoading: true
}

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case homeTypes.SET_CONTENT:
      return {
        ...state,
        contentProduct: action.payload
      }
    case homeTypes.SET_CONTENT_TESTIMONALS:
      return {
        ...state,
        contentTestimonals: action.payload
      }
      case homeTypes.SET_CONTENT_INSTAGRAM:
        return {
          ...state,
          contentInstagram: action.payload
        }
      case homeTypes.SET_CONTENT_SERIES:
        return {
          ...state,
          contentSeries: action.payload
        }
    case homeTypes.SET_EDIT_CONTENT:
      return {
        ...state,
        contentEdit: action.payload
      }
      case homeTypes.SET_IMAGES:
        return {
          ...state,
          images: action.payload
        }
    case homeTypes.LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: action.payload
      }
    default:
      return state;
  }
}
export default homeReducer