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


export const setEditContentMain= product =>({
    type:productsTypes.SET_EDIT_CONTENT_MAIN_PRODUCT,
    payload:product
})

export const setRandomProducts= products =>({
    type:productsTypes.SET_RANDOM_PRODUCTS,
    payload:products
})


export const editContentMainProduct = contentID =>({
    type:productsTypes.FETCH_CONTENT_EDIT_MAIN_PRODUCT,
    payload:contentID
})

export const updateContentMainProduct = contentId =>({
    type:productsTypes.UPDATE_CONTENT_MAIN_PRODUCT,
    payload:contentId
})



export const loadingToggleAction = (status) =>({
    type:productsTypes.LOADING_TOGGLE_ACTION_PRODUCTS,
    payload:status
})

export const loadingToggleActionCurrentProducts = (statusLoader) =>({
    type:productsTypes.LOADING_TOGGLE_ACTION_CURRENT_PRODUCTS,
    payload:statusLoader
})


export const fetchRandomProductsStart = (filters={}) =>({
    type:productsTypes.FETCH_RANDOMS_PRODUCTS,
    payload:filters 
})


export const setLoadedProducts = (payload) => ({
    type:productsTypes.SET_LOADED_PRODUCTS,
    payload,
  });