import homeTypes from "./home.types";


export const addHomeContentStart = homeData =>({
    type:homeTypes.ADD_NEW_HOME_CONTENT,
    payload:homeData
})

export const fetchHomeContentStart = (data) =>({
    type:homeTypes.FETCH_CONTENT_START,
    payload:data
})

export const setHomeContent = contentProduct =>({
    type:homeTypes.SET_CONTENT,
    payload:contentProduct
})

export const deleteHomeContentStart = sliderID =>({
    type:homeTypes.DELETE_CONTENT_START,
    payload:sliderID
})



export const addHomeContentTestimonalsStart = homeDataTestimonals =>({
    type:homeTypes.ADD_NEW_HOME_CONTENT_TESTIMONALS,
    payload:homeDataTestimonals
})

export const fetchHomeContentTestimonalsStart = (data) =>({
    type:homeTypes.FETCH_CONTENT_TESTIMONALS_START,
    payload:data
})

export const setHomeContentTestimonals = contentTestimonals =>({
    type:homeTypes.SET_CONTENT_TESTIMONALS,
    payload:contentTestimonals
})

export const deleteHomeContentTestimonalsStart = testimonalsID =>({
    type:homeTypes.DELETE_CONTENT_TESTIMONALS_START,
    payload:testimonalsID
})

export const editContent = contentID =>({
    type:homeTypes.FETCH_CONTENT_EDIT,
    payload:contentID
})
export const setEditContent = content =>({
    type:homeTypes.SET_EDIT_CONTENT,
    payload:content
})
// export const fetchCurrentProductStart = productID =>({
//     type:productsTypes.FETCH_CURRENT_PRODUCT_START,
//     payload:productID
// })


// export const setCurrentProduct = product =>({
//     type:productsTypes.SET_CURRENT_PRODUCT,
//     payload:product
// })