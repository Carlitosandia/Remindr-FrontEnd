import {
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    
} from '../types'

const initalState = {
    users: [],
    error: null,
    loading: false
}

export default function (state = initalState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                loading: action.payload
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SAVE_USER:
            return {
                ...state,
                loading: action.payload
            }
        case SAVE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [action.payload]
            }
        case SAVE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGIN_USER:
            return{
                ...state,
                loading: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload
            }
        case LOGIN_USER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
} 