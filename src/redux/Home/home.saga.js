import {takeLatest, put, call, all} from "redux-saga/effects";
import homeTypes from "./home.types";
import { handleAddContentHome, handleFetchContentHome } from "./home.helpers";
import { fetchHomeContentStart } from "./home.actions";
import {auth} from "../../firebase/utils";
import { setHomeContent } from "./home.actions";

export function * addNewProducts({payload}) {
    try {
      const timestamp = new Date();
      yield handleAddContentHome({
        ...payload,
        productAdminUID: auth.currentUser.uid,
        createdDate: timestamp
      });
      yield put(fetchHomeContentStart());
    } catch (err) {
      //console.log(err);
    }
  }

  export function* fetchHomeContent({ payload }){
    try{
        const content = yield handleFetchContentHome(payload);
        yield put(setHomeContent(content))
    }
    catch(err){
        //console.log(err);
    }
}

  export function* onFetchContentStart(){
    yield takeLatest(homeTypes.FETCH_CONTENT_START,fetchHomeContent)
}
export function * onAddHomeContentStart() {
    yield takeLatest(homeTypes.ADD_NEW_PRODUCT_START, addNewProducts)
  }

export default function * homeSagas() {
    yield all([call(onAddHomeContentStart),call(onFetchContentStart)])
  }