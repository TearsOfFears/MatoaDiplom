import productsTypes from "./products.types";


export const addProductStart = productsData =>({
    type:productsTypes.ADD_NEW_PRODUCT_START,
    payload:productsData
})

export const fetchProductsStart = (filters={}) =>({
    type:productsTypes.FETCH_PRODUCTS_START,
    payload:filters
})

export const setProducts = products =>({
    type:productsTypes.SET_PRODUCTS,
    payload:products
})

export const deleteProductsStart = productID =>({
    type:productsTypes.DELETE_PRODUCTS_START,
    payload:productID
})

export const fetchCurrentProductStart = productID =>({
    type:productsTypes.FETCH_CURRENT_PRODUCT_START,
    payload:productID
})

export const setCurrentProduct = product =>({
    type:productsTypes.SET_CURRENT_PRODUCT,
    payload:product
})