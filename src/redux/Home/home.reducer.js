import productsTypes from "./home.types";


const INITIAL_STATE={
    content:[]
}

const homeReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case productsTypes.SET_CONTENT:
            return{
                ...state,
                content: action.payload,
            }
                
        default:
            return state;
    }
}
export default homeReducer