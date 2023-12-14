//NPM dependencies
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
//Our dependencies
import {
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
}from '../types'

export function createUserAction(user){
    return async (dispatch)=>{
        //We create the user
        dispatch(createUser());
        try{
            //If the user is created successfully
            dispatch(createUserSuccess(user));
        } catch(error){
            //If the user is not created successfully
            console.log(error);
            dispatch(createUserFailed(true))
        }
    }
}
//We set that the state is loading
const createUser = () => ({
    type:CREATE_USER,
    payload:true
});
//We set that the state is not loading and we save the user data
const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload:user
})
//We set that the state is not loading and we set the error
const createUserFailed = (status) => ({
    type: CREATE_USER_FAILED,
    payload: status
})

export function saveUserAction(user){
    return async (dispatch) => {
        //We save the user in the state
        dispatch(saveUser());
        try{
            console.log(user);
            //Call the api to save the user in the database
            const response = await clienteAxios.post('./saveUser', user);
            dispatch( saveUserSuccess(user) )
        }catch(error){
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo guardar en la base de datos!',
            })
            dispatch( saveUserFailed(true) )
        }
    }
}
//We set that the state is loading
const saveUser = () => ({
    type:SAVE_USER,
    payload:true
})
//We set that the state is not loading and we save the user data
const saveUserSuccess = (user) => ({
    type: SAVE_USER_SUCCESS,
    payload:user
})
//We set that the state is not loading and we set the error
const saveUserFailed = (status) => ({
    type: SAVE_USER_FAILED,
    payload: status
})

export function loginUserAction (user){
    return async (dispatch) => {
        dispatch(loginUser());
        try{
            //Call the api to login the user
            const response = await clienteAxios.post('./loggingUser', user);
            //If the user is not found
            if(response.data.message === 'User not found'){
                dispatch(loginUserFailed(true));
                return;
            }else{
                //Store the user data in sessionStorage
                sessionStorage.setItem('userData', JSON.stringify(response.data));
                dispatch(loginUserSucces(response.data));
                //Return true to redirect the user to the home page
                return true;
            }
        } catch(error){
            console.log(error);
        }
    }
}
//We set that the state is loading
const loginUser = () => ({
    type:LOGIN_USER,
    payload:true
})
//We set that the state is not loading and we save the user data
const loginUserSucces = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
}) 
//We set that the state is not loading and we set the error
const loginUserFailed = (status) => ({
    type: LOGIN_USER_FAILED,
    payload: status
})




