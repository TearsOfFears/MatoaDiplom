import homeTypes from "./home.types";


export const addHomeContentStart = homeData =>({
    type:homeTypes.ADD_NEW_HOME_CONTENT,
    payload:homeData
})

export const fetchHomeContentStart = (filters={}) =>({
    type:homeTypes.FETCH_CONTENT_START,
    payload:filters
})

export const setHomeContent = content =>({
    type:homeTypes.SET_CONTENT,
    payload:content
})

export const deleteHomeContentStart = productID =>({
    type:homeTypes.DELETE_CONTENT_START,
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