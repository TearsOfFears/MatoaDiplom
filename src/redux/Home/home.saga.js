import {takeLatest, put, call, all} from "redux-saga/effects";
import homeTypes from "./home.types";
import {handleAddContentHome, handleFetchContentHome, handleDeleteHomeContent, handleAddContentHomeTestimonals,handleFetchContentHomeTestimonals} from "./home.helpers";
import {setHomeContent,fetchHomeContentStart,fetchHomeContentTestimonalsStart, setHomeContentTestimonals,} from "./home.actions";
import {auth} from "../../firebase/utils";

export function * addNewContentHome({payload}) {
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

export function * fetchHomeContent(payload) {
  try {
    const content = yield handleFetchContentHome(payload);
    yield put(setHomeContent(content))
  } catch (err) {
    //console.log(err);
  }
}

export function * deleteHomeContent({payload}) {
  try {
    yield handleDeleteHomeContent(payload);
    yield put(fetchHomeContentStart());
  } catch (err) {
    //console.log(err);
  }
}

export function * addNewContentTestimonalsHome({payload}) {
  try {
    const timestamp = new Date();
    yield handleAddContentHomeTestimonals({
      ...payload,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(fetchHomeContentTestimonalsStart());
  } catch (err) {
    //console.log(err);
  }
}

export function * fetchHomeContentTestimonals(payload) {
  try {
    const content = yield handleFetchContentHomeTestimonals(payload);
    yield put(setHomeContentTestimonals(content))
  } catch (err) {
    //console.log(err);
  }
}

export function * deleteHomeContentTestimonals({payload}) {
  try {
    yield handleDeleteHomeContent(payload);
    yield put(fetchHomeContentTestimonalsStart());
  } catch (err) {
    //console.log(err);
  }
}

export function * onDeleteContentTestimonalsStart() {
  yield takeLatest(homeTypes.DELETE_CONTENT_START, deleteHomeContentTestimonals)
}

export function * onFetchContentTestimonalsStart() {
  yield takeLatest(homeTypes.FETCH_CONTENT_START, fetchHomeContentTestimonals)
}
export function * onAddHomeContentTestimonalsStart() {
  yield takeLatest(homeTypes.ADD_NEW_HOME_CONTENT, addNewContentTestimonalsHome)
}

export function * onDeleteContentStart() {
  yield takeLatest(homeTypes.DELETE_CONTENT_START, deleteHomeContent)
}

export function * onFetchContentStart() {
  yield takeLatest(homeTypes.FETCH_CONTENT_START, fetchHomeContent)
}
export function * onAddHomeContentStart() {
  yield takeLatest(homeTypes.ADD_NEW_HOME_CONTENT, addNewContentHome)
}

export default function * homeSagas() {
  yield all([
    call(onAddHomeContentStart),
    call(onFetchContentStart),
    call(onDeleteContentStart),
    call(onAddHomeContentTestimonalsStart),
    call(onFetchContentTestimonalsStart),
    call(onDeleteContentTestimonalsStart)
  ])
}