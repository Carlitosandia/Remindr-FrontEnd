//We import the dependencies from swal
import Swal from 'sweetalert2';
//We import the dependencies from axios
import clienteAxios from '../config/axios';

//We import the types
import {
    GET_GOOGLEACCOUNT,
    GET_GOOGLEACCOUNT_SUCCESS,
    GET_GOOGLEACCOUNT_FAILED,
    REGISTER_GOOGLEACCOUNT,
    REGISTER_GOOGLEACCOUNT_SUCCESS,
    REGISTER_GOOGLEACCOUNT_FAILED
} from '../types';

export function getGoogleAccountsAction(id) {
    return async (dispatch) => {
        dispatch(getGoogleAccount());
        try {
            //Call the api to get the google accounts
            const response = await clienteAxios.get(`./getAccount/${id}`);
            if (response.data.length === 0) {
                dispatch(getGoogleAccountSuccess(response.data))
            } else {
                // Obtén el objeto almacenado en sessionStorage
                const storedUserData = sessionStorage.getItem('userData');
                // Parsea el objeto JSON
                const userData = JSON.parse(storedUserData);
                // Actualiza el valor de una propiedad existente o agrega una nueva propiedad
                userData.googleAccounts = response.data;

                // Almacena el objeto actualizado en sessionStorage
                sessionStorage.setItem('userData', JSON.stringify(userData));
                // Convierte el objeto actualizado a JSON y guárdalo en sessionStorage
                dispatch(getGoogleAccountSuccess(response.data))
            }
        } catch (error) {
            console.log(error)
            dispatch(getGoogleAccountFailed(true))
        }
    }
}
//Set the state to loading
const getGoogleAccount = () => ({
    type: GET_GOOGLEACCOUNT,
    payload: true
})
//Set the state to not loading and save the accounts
const getGoogleAccountSuccess = (accounts) => ({
    type: GET_GOOGLEACCOUNT_SUCCESS,
    payload: accounts
})
//Set the state to not loading and set the error
const getGoogleAccountFailed = (status) => ({
    type: GET_GOOGLEACCOUNT_FAILED,
    payload: status
})

export function registerGoogleAccountAction(googleData) {
    return async (dispatch) => {
        dispatch(registerGoogleAccount())
        try {
            //Call the api to save the google data
            const response = await clienteAxios.post('./save/googledata', googleData)
            if(response){
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta agregada!',
                    text: 'La cuenta se agregó correctamente!',
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo guardar la cuenta!',
                })
            }
        } catch (error) {
            console.log(error);
            dispatch(registerGoogleAccountFailed(true));
        }
    }
}

const registerGoogleAccount = () => ({
    type: REGISTER_GOOGLEACCOUNT,
    payload: true
})

const registerGoogleAccountFailed = (status) => ({
    type: REGISTER_GOOGLEACCOUNT_FAILED,
    payload: status
})