import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

import{
    GET_NOTIFICATION,
    NOTIFICATION_WORK,
    NOTIFICATION_WORK_SUCCESS,
    NOTIFICATION_WORK_FAILED
} from '../types';


export function getElementNotificationAction(selectedElement){
    return (dispatch) => {
        dispatch(getElementNotification(selectedElement));
    }
}

const getElementNotification = selectedElement =>({
    type: GET_NOTIFICATION,
    payload:selectedElement
})


export function setNotificationWorkAction(notification){
    return async (dispatch) => {
        dispatch(notificationWork());
        try {
            //Call the api to set the notification
            const response = await clienteAxios.post('./save/notification/work', notification);
            if(response.data.message === 'Notification saved'){
                dispatch(notificationWorkSuccess(response.data));
                return true;   
            }else if(response.data.message === 'Notification already exists'){
                dispatch(notificationWorkFailed(true));
                return false;
            }
        } catch (error) {
            console.log(error);
            dispatch(notificationWorkFailed(true));
        }
    }
}
//Set the state to loading
const notificationWork = () =>({
    type: NOTIFICATION_WORK,
    payload:true
})
//Set the state to not loading and save the notification
const notificationWorkSuccess = notification =>({
    type: NOTIFICATION_WORK_SUCCESS,
    payload:notification
})
// Set the state to not loading and set the error
const notificationWorkFailed = status =>({
    type: NOTIFICATION_WORK_FAILED,
    payload:status
})