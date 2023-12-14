import{
    GET_GOOGLEACCOUNT,
    GET_GOOGLEACCOUNT_SUCCESS,
    GET_GOOGLEACCOUNT_FAILED,
    REGISTER_GOOGLEACCOUNT,
    REGISTER_GOOGLEACCOUNT_SUCCESS,
    REGISTER_GOOGLEACCOUNT_FAILED
} from '../types';

const initalState = {
    googleAccount: [],
    error: null,
    loading: false,
}

export default function (state = initalState, action){
    switch(action.type){
        case GET_GOOGLEACCOUNT:
            return{
                ...state,
                loading:action.payload
            }
        case GET_GOOGLEACCOUNT_SUCCESS:
            return{
                ...state,
                loading:false,
                googleAccount: [...state.googleAccount,action.payload]
            }
        case GET_GOOGLEACCOUNT_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_GOOGLEACCOUNT:
            return{
                ...state,
                loading:action.payload
            }
        case REGISTER_GOOGLEACCOUNT_SUCCESS:
            return{
                ...state,
                loading:false,
                googleAccount:[action.payload]
            }
        case REGISTER_GOOGLEACCOUNT_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}