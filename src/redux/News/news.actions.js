import newsTypes from "./news.types";


export const saveNews = news =>({
    type:newsTypes.SAVE_NEWS_START,
    payload:news
})

export const setNews = news =>({
    type:newsTypes.SET_NEWS_START,
    payload:news
})

export const getNewsDetailsStart = newsID =>({
    type:newsTypes.GET_NEWS_DETAILS_START,
    payload:newsID
})

export const setNewsDetailsStart = order =>({
    type:newsTypes.SET_ORDER_DETAILS,
    payload:order
})


export const fetchNewsHistory = (filters={}) =>({
    type:newsTypes.FETCH_NEWS_HISTORY,
    payload:filters
})

export const deleteNews = newsID =>({
    type:newsTypes.DELETE_NEWS,
    payload:newsID
})


export const fetchNewsEdit = newsID=>({
    type:newsTypes.FETCH_NEWS_EDIT,
    payload:newsID
})

export const updateNews = (news) =>({
    type:newsTypes.UPDATE_NEWS,
    payload:news
})

export const setNewsEdit = news =>({
    type:newsTypes.SET_EDIT_NEWS,
    payload:news
})