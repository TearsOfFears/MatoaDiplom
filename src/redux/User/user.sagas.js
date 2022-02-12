import {takeLatest,call,all,put} from "redux-saga/effects"
import userTypes from "./user.types";

import { auth,handleUserProfile,getCurrentUser, GoogleProvider } from "../../firebase/utils";

import {signInSuccess,signOutUserSuccess} from './user.actions';


export function* getSnapshotFromUserAuth(user){
    try{
        
              const userRef =  yield call(handleUserProfile,{userAuth:user});
              const snapshot = yield userRef.get();
          yield put(
            signInSuccess({
                id:snapshot.id,
                ...snapshot.data(),
            })
        );

            
    }catch(err){
//console.log(err);
    }
}

export function* emailSignIn({payload:{email,password}}){

    try {
       const {user} =  yield auth.signInWithEmailAndPassword(email, password);
       yield getSnapshotFromUserAuth(user);
    } catch (err) {
        console.log(err);
    }
}


export function* isUserAuthent(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(err){
        console.log(err);
    }
}


export function* signOutUser() {
    try {
      yield auth.signOut();
      yield put(
        signOutUserSuccess()
      )
  
    } catch (err) {
      // console.log(err);
    }
  }
export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START,emailSignIn );
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START,signOutUser);
}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION,isUserAuthent)
}

export default function* userSagas(){
    yield all([call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutUserStart)])
}