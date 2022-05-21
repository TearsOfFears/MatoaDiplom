import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErrors: [],
  loading:true,
  allUsers:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErrors: [],
        loading:false,
      }
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE
      }
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErrors: action.payload
      }
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
        loading:false,
      }
      case userTypes.SET_ALL_USERS:
        return {
        ...state,
        allUsers: action.payload
      }
      case userTypes.LOADING:
        return {
          ...state,
          loading: action.payload
        }

    default:
      return state;
  }
};

export default userReducer;