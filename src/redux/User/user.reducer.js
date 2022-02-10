import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpError: [],
  setPasswordSuccess: false,
  setPasswordError: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload
      }
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload
      }
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload
      }
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        setPasswordSuccess: action.payload
      }
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        setPasswordError: action.payload
      }
      case userTypes.RESET_AUTH_FORM:
      return {
        ...state,
        signInSuccess: false,
  signUpSuccess: false,
  signUpError: [],
  setPasswordSuccess: false,
  setPasswordError: [],
      }
    default:
      return state;
  }
};

export default userReducer;