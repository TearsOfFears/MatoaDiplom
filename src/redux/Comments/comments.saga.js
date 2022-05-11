import commentsTypes from "./comments.types";
import {
    takeLatest,
    put,
    all,
    call,
} from 'redux-saga/effects'
import {
    auth
} from "../../firebase/utils";
import { handleDeleteComment, handleFetchComments, handleSaveComment } from "./comments.helpers";
import { setComments } from "./comments.actions";



export function* saveCommentStart({
    payload
}) {
    try {
        const timestamp = new Date();
        yield handleSaveComment({
            ...payload,
            commentCreatedUserID: `${auth.currentUser.displayName}-${auth.currentUser.uid}`,
            commentCreated: timestamp
        });
    } catch (err) {
        console.log(err);
    }
}

export function* onSaveCommentStart() {
    yield takeLatest(commentsTypes.SAVE_COMMENT_START, saveCommentStart)
}

export function* fetchComments({
    payload
}) {
    try {
        const news = yield handleFetchComments(payload);
        yield put(setComments(news))

        //   const {data} = products;
        //    if(data.length!==0){
        //     yield put(loadingToggleAction(false));
        //    }

        //yield put(setProducts(products))
    } catch (err) {
        console.log(err);
    }
}

export function* onFetchCommentsStart() {
    yield takeLatest(commentsTypes.FETCH_COMMENT_START, fetchComments)
}


export function* deleteNews({
    payload
}) {
    try {
        yield handleDeleteComment(payload);
        yield put(handleFetchComments());
    } catch (err) {
        //console.log(err);
    }

}
export function* onDeleteComment() {
    yield takeLatest(commentsTypes.DELETE_COMMENT, deleteNews)
}

  

export default function* commentsSagas() {
    yield all([call(onSaveCommentStart), call(onFetchCommentsStart), call(onDeleteComment)])
}