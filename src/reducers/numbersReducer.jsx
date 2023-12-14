import{
    SET_PHONE,
    SET_PHONE_SUCCESS,
    SET_PHONE_FAILED
} from '../types';

const initalState = {
    phones: [],
    error: null,
    loading: false
}

export default function (state = initalState, action){
    switch(action.type){
        case SET_PHONE:
            return{
                ...state,
                loading:action.payload
            }
        case SET_PHONE_SUCCESS:
            return{
                ...state,
                loading:false,
                phones: [...state.phones, action.payload]
            }
        case SET_PHONE_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}