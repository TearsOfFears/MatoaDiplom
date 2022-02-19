import {takeLatest, put, call, all} from "redux-saga/effects";
import productsTypes from "./products.types";
import { setProducts, fetchProductsStart } from "./products.actions";
import {handleAddProduct,handleFetchProducts,handleDeleteProduct} from "./products.helpers";

import {auth} from "../../firebase/utils";

export function * addNewProducts({
  payload: {
    productCategory,
    productName,
    productThumbnail,
    price,
    documentID
  }
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      price,
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
  yield all([call(onAddProductsStart),call(onFetchProductsStart),call(onDeleteProductStart)])
}