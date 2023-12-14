import{
    GET_NOTIFICATION,
    NOTIFICATION_WORK,
    NOTIFICATION_WORK_SUCCESS,
    NOTIFICATION_WORK_FAILED
} from '../types';

const initalState = {
    notifications: null,
    error: null,
    loading: false
}

export default function (state = initalState, action){
    switch(action.type){
        case GET_NOTIFICATION:
            return{
                ...state,
                notifications:action.payload
            }
        case NOTIFICATION_WORK:
            return{
                ...state,
                loading:action.payload
            }
        case NOTIFICATION_WORK_SUCCESS:
            return{
                ...state,
                loading:false,
                notifications:action.payload
            }
        case NOTIFICATION_WORK_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}