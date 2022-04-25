import {takeLatest,take,call, all, put} from "redux-saga/effects"
import userTypes from "./user.types";

import {auth, handleUserProfile, getCurrentUser, GoogleProvider} from "../../firebase/utils";

import {signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess} from './user.actions';

import {handleResetPasswordAPI} from "./user.helpers";

export function * isUserAuthent() {
  try {
    const userAuth = yield getCurrentUser();
    console.log(getCurrentUser());
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
    call(onGoogleSignInStart)
  ])
}