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

export const updateContent = contentId =>({
    type:homeTypes.UPDATE_CONTENT,
    payload:contentId
})


export const editContentProduct = contentID =>({
    type:homeTypes.FETCH_CONTENT_EDIT_PRODUCT,
    payload:contentID
})

export const updateContentProduct = contentId =>({
    type:homeTypes.UPDATE_CONTENT_PRODUCT,
    payload:contentId
})


export const setEditContent = (content) =>({
    type:homeTypes.SET_EDIT_CONTENT,
    payload:content
})

export const loadingToggleAction = (status) =>({
    type:homeTypes.LOADING_TOGGLE_ACTION,
    payload:status
})




export const addHomeContentInstagramStart = img =>({
    type:homeTypes.ADD_NEW_HOME_CONTENT_INSTAGRAM,
    payload:img
})

export const fetchHomeContentInstagramStart = (data) =>({
    type:homeTypes.FETCH_CONTENT_START_INSTAGRAM,
    payload:data
})

export const setHomeInstagramContent = contentProduct =>({
    type:homeTypes.SET_CONTENT_INSTAGRAM,
    payload:contentProduct
})




export const deleteHomeContentInstagramStart = sliderID =>({
    type:homeTypes.DELETE_CONTENT_INSTAGRAM_START,
    payload:sliderID
})


export const editContentInstagram = contentID =>({
    type:homeTypes.FETCH_CONTENT_EDIT_INSTAGRAM,
    payload:contentID
})

export const updateContentInstagram  = contentId =>({
    type:homeTypes.UPDATE_CONTENT_INSTAGRAM,
    payload:contentId
})

export const fetchHomeSeries= (filters={}) =>({
    type:homeTypes.FETCH_CONTENT_SERIES,
    payload:filters
})


export const setHomeSeries= series =>({
    type:homeTypes.SET_CONTENT_SERIES,
    payload:series
})
