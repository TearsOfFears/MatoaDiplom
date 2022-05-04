import {takeLatest, put, call, all} from "redux-saga/effects";
import productsTypes from "./products.types";
import {setProducts, fetchProductsStart, setCurrentProduct, loadingToggleAction, setRandomProducts} from "./products.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchCurrentProduct,
  handleEditContent,
  handleUpdateContent,
  handleFetchRandomProducts
} from "./products.helpers";

import {auth} from "../../firebase/utils";

export function * addNewProducts({payload}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(fetchProductsStart());
  } catch (err) {
    //console.log(err);
  }
}

export function * fetchProducts({payload}) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products))
    const {data} = products;
     if(data.length !==0){
      yield put(loadingToggleAction(false));
     }
 
    //yield put(setProducts(products))
  } catch (err) {
    console.log(err);
  }
}

export function * fetchRandomProducts({payload}) {
  try {
    const products = yield handleFetchRandomProducts(payload);
    yield put(setRandomProducts(products))
    const {data} = products;
    console.log();
     if(products.data.length!==0){
      yield put(loadingToggleAction(false));
     }
 
    //yield put(setProducts(products))
  } catch (err) {
    console.log(err);
  }
}

export function * deleteProduct({payload}) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    //console.log(err);
  }
}

export function * fetchCurrentProduct({payload}) {
  try {
    const product = yield handleFetchCurrentProduct(payload);
    yield put(setCurrentProduct(product));

    // if(product.lenght!==0){
    //   yield put(loadingToggleAction(true))
    // }

  } catch (err) {
    console.log(err);
  }
}

export function * editContent({payload}) {
  try {
    const product = yield handleEditContent(payload);
    yield put(setCurrentProduct(product));
  } catch (err) {
    //console.log(err);
  }
}

export function * updateContent({
  payload: {
    updateData,
    id
  }
}) {
  try {
    const content = yield put(handleUpdateContent(updateData, id))
    yield put(setCurrentProduct(content))
  } catch (err) {
    //console.log(err);
  }
}

export function * onUpdateContent() {
  yield takeLatest(productsTypes.UPDATE_CONTENT_MAIN_PRODUCT, updateContent)
}

export function * onEditContent() {
  yield takeLatest(productsTypes.FETCH_CONTENT_EDIT_MAIN_PRODUCT, editContent)
}

export function * onFetchCurrentProduct() {
  yield takeLatest(productsTypes.FETCH_CURRENT_PRODUCT_START, fetchCurrentProduct)
}

export function * onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCTS_START, deleteProduct)
}

export function * onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function * onAddProductsStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addNewProducts)
}

export function * onFetchRandomProductsStart() {
  yield takeLatest(productsTypes.FETCH_RANDOMS_PRODUCTS, fetchRandomProducts)
}


export default function * productsSagas() {
  yield all([
    call(onAddProductsStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchCurrentProduct),
    call(onEditContent),
    call(onUpdateContent),
    call(onFetchRandomProductsStart)
  ])
}