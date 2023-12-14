//React Dependencies
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

//Styles imports
import Styles from './configNotification.module.css';
import Header from "./Header";
import Swal from "sweetalert2";

//Import the actions
import { setNotificationWorkAction } from "../actions/notificationActions";

const ConfigNotificationWork = () => {
    //Access the state from the store
    const configNotification = useSelector(state => state.notifications.notifications);

    //Component states
    const [notificationTime, saveNotification] = useState('');

    //set the dispatch
    const dispatch = useDispatch();

    //set Navigate
    const Navigate = useNavigate();
    //We use the dispatch to create a function in the const setNotification
    const setNotification = (notification) => dispatch(setNotificationWorkAction(notification));


    const submitNotification = async e => {
        //Prevent default action
        e.preventDefault();
        //Access the session storage data
        const storedUserData = sessionStorage.getItem('userData');
        //Parse the data to json
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        //Access the id from the user
        const userId = userData._id;
        //Access the id from the work
        const workId = configNotification._id;

        //Execute the action to set the notification
        const notification = await setNotification({
            userId,
            workId,
            notificationTime
        });
        //Verify if the notification was created
        if (notification) {
            //Show the alert
            Swal.fire({
                icon: 'success',
                title: 'Guardado',
                text: 'La notificación se guardó correctamente!',
            }).then(() => {
                //Redirect the user to the home page
                Navigate('/home');
            })
        } else {
            //Show the error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La notificación ya existe!',
            })
        }
    }


    return (
        <div className={Styles.container}>
            <Header />
            <div className={Styles.instructions}>
                <h1>Configuracion de Notificaciones</h1>
                <p>Estas por configurar las notificaciones del siguiente trabajo</p>
                <p>{configNotification.title}</p>
                <div className={Styles.formContainer}>
                    <form
                        onSubmit={submitNotification}
                        className={Styles.form}
                    >
                        {/* Configurate the notification interval */}
                        <div className={Styles.selectContainer}>
                            <select className={Styles.select} value={notificationTime} onChange={e => saveNotification(e.target.value)}>
                                <option className={Styles.option} value="">--Seleccione una opcion--</option>
                                <option className={Styles.option} value="1">1 hr</option>
                                <option className={Styles.option} value="2">2 hrs</option>
                                <option className={Styles.option} value="4">4 hrs</option>
                                <option className={Styles.option} value="6">6 hrs</option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            className={Styles.btnSubmitNotifications}
                            value="Ingresar"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfigNotificationWork;