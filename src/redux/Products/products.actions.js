import productsTypes from "./products.types";


export const addProductStart = productsData =>({
    type:productsTypes.ADD_NEW_PRODUCT_START,
    payload:productsData
})

export const fetchProductsStart = () =>({
    type:productsTypes.FETCH_PRODUCTS_START,
})

export const setProducts = product =>({
    type:productsTypes.SET_PRODUCTS,
    payload:product
})

export const deleteProductsStart = productID =>({
    type:productsTypes.DELETE_PRODUCTS_START,
    payload:productID
})