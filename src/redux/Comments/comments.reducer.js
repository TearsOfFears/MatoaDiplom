import commentsTypes from "./comments.types";

const INITIAL_STATE = {
    comments: [],
}
const commentReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case commentsTypes.SET_COMMENT_START:
            return{
                ...state,
                comments:action.payload
            }
            // case newsTypes.SET_NEWS_DETAILS:
            // return{
            //     ...state,
            //     newsDetails:action.payload
            // };
            // case newsTypes.SET_EDIT_NEWS:
            //     return {
            //       ...state,
            //       newsEdit: action.payload
            //     }
        default:
            return state;
    }
}


export default commentReducer