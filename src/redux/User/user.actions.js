import userTypes from "./user.types";

export const emailSigInStart = userCredit =>({
    type:userTypes.EMAIL_SIGN_IN_START,
    payload:userCredit
})

export const signInSuccess = user =>({
    type:userTypes.SIGN_IN_SUCCESS,
    payload:user
})

export const checkUserSession =() =>({
    type:userTypes.CHECK_USER_SESSION,
  
})

export const signOutUserStart =() =>({
    type:userTypes.SIGN_OUT_USER_START,
})
export const signOutUserSuccess =() =>({
    type:userTypes.SIGN_OUT_USER_SUCCESS,
})

export const registUserStart = userCredit =>({
    type:userTypes.REGIST_USER_START,
    payload:userCredit
})

export const userError = err =>({
    type:userTypes.USER_ERROR,
    payload:err
})

export const onResetPasswordStart = userCredit =>({
    type:userTypes.RESET_PASSWORD_START,
    payload:userCredit
})

export const resetPasswordSuccess = () =>({
    type:userTypes.RESET_PASSWORD_SUCCESS,
    payload:true
})

export const resetUserState = () =>({
    type:userTypes.RESET_USER_STATE,
})

export const setCurrentUser = user =>({
    type:userTypes.SET_CURRENT_USER,
    payload:user,
})

export const googleSignIn = () =>({
    type:userTypes.GOOGLE_SIGN_IN_START,
})


export const  resetAllAuthForm = () =>({
    type:userTypes.RESET_AUTH_FORM
})


export const toggleLoading = (status) =>({
    type:userTypes.LOADING,
    payload:status
})


export const getAllUsers = (filters={}) =>({
    type:userTypes.GET_ALL_USERS,
    payload:filters
})

export const setUsers = users =>({
    type:userTypes.SET_ALL_USERS,
    payload:users
})

export const giveUserRole = role =>({
    type:userTypes.GIVE_USER_ROLES,
    payload:role
})

export const deleteUser = uid =>({
    type:userTypes.DELETE_USER,
    payload:uid
})