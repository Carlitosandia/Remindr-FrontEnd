import clienteAxios from '../config/axios';
import{
    SET_PHONE,
    SET_PHONE_SUCCESS,
    SET_PHONE_FAILED
} from '../types';

export function setPhoneAction(phone){
    return async (dispatch) => {
        //Save the data from the component
        const lada = phone.lada;
        const number = phone.number;
        const dataPhone = lada+number
        //Create an object with the data
        const data = {
            "phone": dataPhone
        }
        //We set that the state is loading
        dispatch(setPhone());
        try{
            const response =  await clienteAxios.post('/setToken', data)
            if(response.data.message === "mensaje enviado"){
                dispatch(setPhoneSuccess(response.data));
                return true;
            }else{
                dispatch(setPhoneFailed(true));
                return false;
            }
        } catch(error){
            console.log(error);
            dispatch(setPhoneFailed(true))
        }
    }
}
//We set that the state is loading
const setPhone = () => ({
    type: SET_PHONE,
    payload:true
})
//We set that the state is not loading and we save the user data
const setPhoneSuccess = (phone) => ({
    type: SET_PHONE_SUCCESS,
    payload: phone
})
//We set that the state is not loading and we set the error
const setPhoneFailed = (status) => ({
    type:SET_PHONE_FAILED,
    payload: status
})