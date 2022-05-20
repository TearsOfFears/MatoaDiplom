import {takeLatest, put, call, all, take} from "redux-saga/effects";
import homeTypes from "./home.types";
import {handleAddContentHome, handleFetchContentHome, handleDeleteHomeContent, handleAddContentHomeTestimonals,handleFetchContentHomeTestimonals,handleDeleteHomeContentTestimonals, handleEditHomeContentTestimonals,handleUpdateContentHomeTestimonals, handleEditHomeContentProduct, handleUpdateContentHomeProduct, handleAddContentHomeInstagram, handleFetchContentHomeInstagram, handleDeleteHomeContentInstagram, handleEditHomeContentInstagram, handleUpdateContentHomeInstagram, handleFetchSeries, handleAddImage, handleFetchImages, handleDeleteImages} from "./home.helpers";
import {setHomeContent,fetchHomeContentStart,fetchHomeContentTestimonalsStart, setHomeContentTestimonals, setEditContent, getCurrentDocumentId, loadingToggleAction, setHomeInstagramContent, fetchHomeContentInstagramStart, setHomeSeries, setImages, fetchImages,} from "./home.actions";
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
    if(content.lenght!==0){
    
      yield put(loadingToggleAction(false))
    }
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


export function * updateContent({
  payload: {
    editData, id
  }
}) {
  try {

    const content =  yield put(handleUpdateContentHomeTestimonals(editData, id))
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


export function * updateContentProduct({
  payload: {
    editData, id
  }
}) {
  try {
    const content =  yield put(handleUpdateContentHomeProduct(editData, id))
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





export function * addNewContentInstagramHome({payload}) {
  try {
    const timestamp = new Date();
    yield handleAddContentHomeInstagram({
      ...payload,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(fetchHomeContentInstagramStart());
  } catch (err) {
    console.log(err);
  }
}

export function * fetchHomeContentInstagram({payload}) {
  try {
    const content = yield handleFetchContentHomeInstagram(payload);
    yield put(setHomeInstagramContent(content))
  } catch (err) {
    //console.log(err);
  }
}


export function * deleteHomeContentInstagram({payload}) {
  try {
    yield handleDeleteHomeContentInstagram(payload);
    yield put(fetchHomeContentInstagramStart());
  } catch (err) {
    //console.log(err);
  }
}


export function * addNewImageStart({payload}) {
  try {
    const timestamp = new Date();
    yield handleAddImage({
      ...payload,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(fetchImages());
  } catch (err) {
    console.log(err);
  }
}

export function * fetchImagesStart(payload) {
  try {
    const content = yield handleFetchImages(payload);
    yield put(setImages(content))
  } catch (err) {
    //console.log(err);
  }
}


export function * deleteImageStart({payload}) {
  try {
    yield handleDeleteImages(payload);
    yield put(fetchImages());
  } catch (err) {
    //console.log(err);
  }
}




export function * fetchContentSeries({payload}) {
  try {
    const content = yield handleFetchSeries(payload);
    yield put(setHomeSeries(content))
    // if(content.lenght!==0){
    //   yield put(loadingToggleAction(false))
    // }

  } catch (err) {
    console.log(err);
  }
}



export function * onDeleteImageStart() {
  yield takeLatest(homeTypes.DELETE_IMAGE, deleteImageStart)
}

export function * onFetchImagesStart() {
  yield takeLatest(homeTypes.FETCH_IMAGES, fetchImagesStart)
}
export function * onAddImageStart() {
  yield takeLatest(homeTypes.ADD_NEW_IMAGE, addNewImageStart)
}





export function * onDeleteContentInstagramStart() {
  yield takeLatest(homeTypes.DELETE_CONTENT_INSTAGRAM_START, deleteHomeContentInstagram)
}

export function * onFetchContentInstagramStart() {
  yield takeLatest(homeTypes.FETCH_CONTENT_START_INSTAGRAM, fetchHomeContentInstagram)
}
export function * onAddHomeContentInstagramStart() {
  yield takeLatest(homeTypes.ADD_NEW_HOME_CONTENT_INSTAGRAM, addNewContentInstagramHome)
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


export function * onFetchContenSeriesStart() {
  yield takeLatest(homeTypes.FETCH_CONTENT_SERIES, fetchContentSeries)
}

export default function * homeSagas() {
  yield all([
    call(onAddHomeContentStart),
    call(onFetchContentStart),
    call(onDeleteContentStart),
    call(onAddHomeContentTestimonalsStart),
    call(onFetchContentTestimonalsStart),
    call(onDeleteContentTestimonalsStart),
    call(onAddHomeContentInstagramStart),
    call(onFetchContentInstagramStart),
    call(onDeleteContentInstagramStart),
    call(onEditContent),
    call(onUpdateContent),
    call(onEditContentProduct),
    call(onUpdateContentProduct),
    call(onFetchContenSeriesStart),
    call(onAddImageStart),
    call(onFetchImagesStart),
    call(onDeleteImageStart)
  ])
}