import commentsTypes from "./comments.types";


export const addComment = comment =>({
    type:commentsTypes.SAVE_COMMENT_START,
    payload:comment
})

export const setComments = comments =>({
    type:commentsTypes.SET_COMMENT_START,
    payload:comments
})


export const fetchComments = (filters={}) =>({
    type:commentsTypes.FETCH_COMMENT_START,
    payload:filters
})

export const deleteComment = commentID =>({
    type:commentsTypes.DELETE_COMMENT,
    payload:commentID
})


// export const fetchNewsEdit = newsID=>({
//     type:commentsTypes.FETCH_NEWS_EDIT,
//     payload:newsID
// })

// export const updateNews = (news) =>({
//     type:commentsTypes.UPDATE_NEWS,
//     payload:news
// })

// export const setNewsEdit = news =>({
//     type:commentsTypes.SET_EDIT_NEWS,
//     payload:news
// })