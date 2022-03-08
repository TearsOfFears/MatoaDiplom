import productsTypes from "./home.types";


export const addHomeContentStart = homeData =>({
    type:productsTypes.ADD_NEW_HOME_CONTENT,
    payload:homeData
})

export const fetchHomeContentStart = (filters={}) =>({
    type:productsTypes.FETCH_CONTENT_START,
    payload:filters
})

export const setHomeContent = content =>({
    type:productsTypes.SET_CONTENT,
    payload:content
})

export const deleteHomeContentStart = productID =>({
    type:productsTypes.DELETE_CONTENT_START,
    payload:productID
})


// export const fetchCurrentProductStart = productID =>({
//     type:productsTypes.FETCH_CURRENT_PRODUCT_START,
//     payload:productID
// })


// export const setCurrentProduct = product =>({
//     type:productsTypes.SET_CURRENT_PRODUCT,
//     payload:product
// })