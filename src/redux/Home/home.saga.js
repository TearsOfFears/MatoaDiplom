import {takeLatest, put, call, all, take} from "redux-saga/effects";
import homeTypes from "./home.types";
import {handleAddContentHome, handleFetchContentHome, handleDeleteHomeContent, handleAddContentHomeTestimonals,handleFetchContentHomeTestimonals,handleDeleteHomeContentTestimonals, handleEditHomeContentTestimonals,handleUpdateContentHomeTestimonals, handleEditHomeContentProduct, handleUpdateContentHomeProduct} from "./home.helpers";
import {setHomeContent,fetchHomeContentStart,fetchHomeContentTestimonalsStart, setHomeContentTestimonals, setEditContent, getCurrentDocumentId,} from "./home.actions";
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
    yield handleDeleteHomeContentTestimonals(payload);
    yield put(fetchHomeContentTestimonalsStart());
  } catch (err) {
    //console.log(err);
  }
}



export function * editContent({payload}) {
  try {
    const content =  yield handleEditHomeContentTestimonals(payload);
    yield put(setEditContent(content))
  } catch (err) {
    //console.log(err);
  }
}


export function * updateContent({payload}) {
  try {

    const content =  yield put(handleUpdateContentHomeTestimonals(payload.content,payload.id.temp))
    yield put(setEditContent(content))
  } catch (err) {
    console.log(err);
  }
}


export function * editContentProduct({payload}) {
  try {
    const content =  yield handleEditHomeContentProduct(payload);
    yield put(setEditContent(content))
  } catch (err) {
    //console.log(err);
  }
}


export function * updateContentProduct({payload}) {
  try {
    const content =  yield put(handleUpdateContentHomeProduct(payload.content,payload.id.temp))
    yield put(setEditContent(content))
  } catch (err) {
    console.log(err);
  }
}

export function * onUpdateContentProduct() {
  yield takeLatest(homeTypes.UPDATE_CONTENT_PRODUCT, updateContentProduct)
}


export function * onEditContentProduct() {
  yield takeLatest(homeTypes.FETCH_CONTENT_EDIT_PRODUCT, editContentProduct)
}



export function * onUpdateContent() {
  yield takeLatest(homeTypes.UPDATE_CONTENT, updateContent)
}


export function * onEditContent() {
  yield takeLatest(homeTypes.FETCH_CONTENT_EDIT, editContent)
}


export function * onDeleteContentTestimonalsStart() {
  yield takeLatest(homeTypes.DELETE_CONTENT_TESTIMONALS_START, deleteHomeContentTestimonals)
}

export function * onFetchContentTestimonalsStart() {
  yield takeLatest(homeTypes.FETCH_CONTENT_TESTIMONALS_START, fetchHomeContentTestimonals)
}
export function * onAddHomeContentTestimonalsStart() {
  yield takeLatest(homeTypes.ADD_NEW_HOME_CONTENT_TESTIMONALS, addNewContentTestimonalsHome)
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
    call(onDeleteContentTestimonalsStart),
    call(onEditContent),
    call(onUpdateContent),
    call(onEditContentProduct),
    call(onUpdateContentProduct),
    //call(onGetCurrentDocumentID)
  ])
}