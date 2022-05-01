import newsTypes from "./news.types";
import {
    takeLatest,
    put,
    all,
    call,
    take
} from 'redux-saga/effects'
import {
    auth
} from "../../firebase/utils";
import {
    handleFetchNews,
    handleSaveNews,
    handleDeleteNews,
    handleEditNews,
    handleUpdateNews,
} from "./news.helpers";
import {
    setNews,
    setNewsEdit
} from "./news.actions";


export function* saveNewsStart({
    payload
}) {
    try {
        const timestamp = new Date();
        yield handleSaveNews({
            ...payload,
            newsCreaterID: `${auth.currentUser.displayName}-${auth.currentUser.uid}`,
            newsCreated: timestamp
        });
    } catch (err) {
        //console.log(err);
    }
}

export function* onSaveNewsStart() {
    yield takeLatest(newsTypes.SAVE_NEWS_START, saveNewsStart)
}

export function* fetchNews({
    payload
}) {
    try {
        const news = yield handleFetchNews(payload);
        yield put(setNews(news))

        //   const {data} = products;
        //    if(data.length!==0){
        //     yield put(loadingToggleAction(false));
        //    }

        //yield put(setProducts(products))
    } catch (err) {
        console.log(err);
    }
}

export function* onFetchNewsStart() {
    yield takeLatest(newsTypes.FETCH_NEWS_HISTORY, fetchNews)
}


export function* deleteNews({
    payload
}) {
    try {
        yield handleDeleteNews(payload);
        yield put(handleFetchNews());
    } catch (err) {
        //console.log(err);
    }

}
export function* onDeleteNews() {
    yield takeLatest(newsTypes.DELETE_NEWS, deleteNews)
}



export function* editNews({
    payload
}) {
    try {
        const content = yield handleEditNews(payload);
        yield put(setNewsEdit(content));
    } catch (err) {
        //console.log(err);
    }
}

export function* updateNews({
    payload: {
        updateData,
        id
    }
}) {
    try {
        const content = yield put(handleUpdateNews(updateData, id))
        yield put(setNewsEdit(content))
    } catch (err) {
        //console.log(err);
    }
}

export function* onUpdateNewsStart() {
    yield takeLatest(newsTypes.FETCH_NEWS_EDIT,editNews )
}

export function* onfetchNewsEditStart() {
    yield takeLatest(newsTypes.UPDATE_NEWS, updateNews)
}


export default function* newsSagas() {
    yield all([call(onSaveNewsStart), call(onFetchNewsStart), call(onDeleteNews), call(onfetchNewsEditStart), call(onUpdateNewsStart)])
}