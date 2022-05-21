import {takeLatest,take,call, all, put} from "redux-saga/effects"
import userTypes from "./user.types";

import {auth, handleUserProfile, getCurrentUser, GoogleProvider} from "../../firebase/utils";

import {signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess, toggleLoading, setUsers, getAllUsers} from './user.actions';

import {handleDeleteUser, handleFetchUsers, handleResetPasswordAPI, handleSetRoles} from "./user.helpers";

export function * isUserAuthent() {
  try {
    const userAuth = yield getCurrentUser();
    console.log(getCurrentUser());

     if(userAuth){
      yield put(toggleLoading(false));
     }
     if (!userAuth) 
     yield put(toggleLoading(false));
    if (!userAuth) 
      return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    console.log(err);
  }
}

export function * getSnapshotFromUserAuth(user, additionalData = {}) {
  try {

    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData
    });
    const snapshot = yield userRef.get();
    yield put(signInSuccess({
      id: snapshot.id,
      ...snapshot.data()
    }));

  } catch (err) {
    //console.log(err);
  }
}

export function * emailSignIn({
  payload: {
    email,
    password
  }
}) {

  try {
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
  
      yield put(userError(["Перевірте коректність даних"]));
  
  }
}



export function * signOutUser() {

  try {
    yield auth.signOut();
    yield put(signOutUserSuccess())

  } catch (err) {
    // console.log(err);
  }
}

export function * registrUser({
  payload: {
    displayName,
    email,
    password,
    confirmPassword
  }
}) {
  if (password !== confirmPassword) {
    const err = ["Паролі не спіпадають"];
    yield put(userError(err));
    return;
  }

  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = {
      displayName
    };
    yield getSnapshotFromUserAuth(user, additionalData);
    yield put(signInSuccess({user}))

  } catch (err) {
    console.log(err);
  }
}

export function * resetPassword({payload: {
    email
  }}) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (err) {
    yield put(userError(err))
  }

}

export function * googleSignInStart() {
  try {
    const {user} = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromUserAuth(user);
    yield put(signInSuccess(user));

  } catch (err) {
    //console.log(err);
  }
}


export function * fetchAllUsers({payload}) {
  try {
    const product = yield handleFetchUsers(payload);
    yield put(setUsers(product));

  } catch (err) {
    console.log(err);
  }
}
export function* setUserRoles({
  payload: {
    userRoles, documentId
  }
}) {
  try {
      yield handleSetRoles(userRoles, documentId);
      yield put(getAllUsers());
  } catch (err) {
      console.log(err);
  }
}

export function * deleteUser({payload}) {
  try {
    yield handleDeleteUser(payload);
    yield put(getAllUsers());
  } catch (err) {
    console.log(err);
  }
}

export function * onSetRoles() {
  yield takeLatest(userTypes.GIVE_USER_ROLES, setUserRoles);
}

export function * onFetchAllUsers() {
  yield takeLatest(userTypes.GET_ALL_USERS, fetchAllUsers);
}
export function * onDeletehUser() {
  yield takeLatest(userTypes.DELETE_USER, deleteUser);
}

export function * onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function * onRegistrUserStart() {
  yield takeLatest(userTypes.REGIST_USER_START, registrUser);
}

export function * onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function * onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function * onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthent)
}

export function * onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignInStart)
}
export default function * userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onRegistrUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    call(onFetchAllUsers),
    call(onDeletehUser),
    call(onSetRoles)
  ])
}