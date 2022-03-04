import {takeLatest, put, call, all} from "redux-saga/effects";
import productsTypes from "./products.types";
import { setProducts, fetchProductsStart, setCurrentProduct,getProductDesc, setProductDesc } from "./products.actions";
import {handleAddProduct,handleFetchProducts,handleDeleteProduct,handleFetchCurrentProduct, handleGetProductDesc} from "./products.helpers";

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

export function* fetchProducts({ payload }){
    try{
        const products = yield handleFetchProducts(payload);
        yield put(setProducts(products))
    }
    catch(err){
        //console.log(err);
    }
}

export function* deleteProduct({payload}){
    try{
        yield handleDeleteProduct(payload);
        yield put(fetchProductsStart());
    }
    catch(err){
        //console.log(err);
    }
}

export function* fetchCurrentProduct({payload}){
  try{
      const product = yield handleFetchCurrentProduct(payload);
      yield put(setCurrentProduct(product));
  }
  catch(err){
      //console.log(err);
  }
}



export function * onFetchCurrentProduct() {
  yield takeLatest(productsTypes.FETCH_CURRENT_PRODUCT_START, fetchCurrentProduct)
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCTS_START,deleteProduct)
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START,fetchProducts)
}

export function * onAddProductsStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addNewProducts)
}

export default function * productsSagas() {
  yield all([call(onAddProductsStart),call(onFetchProductsStart),call(onDeleteProductStart),call(onFetchCurrentProduct)])
}