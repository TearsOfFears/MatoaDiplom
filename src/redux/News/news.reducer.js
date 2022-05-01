import newsTypes from "./news.types";

const INITIAL_STATE = {
    newsRender:[],
    newsEdit: [],
    newsDetails:{}
}
const newsReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case newsTypes.SET_NEWS_START:
            return{
                ...state,
                newsRender:action.payload
            }
            case newsTypes.SET_NEWS_DETAILS:
            return{
                ...state,
                newsDetails:action.payload
            };
            case newsTypes.SET_EDIT_NEWS:
                return {
                  ...state,
                  newsEdit: action.payload
                }
        default:
            return state;
    }
}


export default newsReducer