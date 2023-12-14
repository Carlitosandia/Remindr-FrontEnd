import React, { useState } from "react";
import { useSelector } from "react-redux";


import Styles from './configNotification.module.css';
import Header from "./Header";

const ConfigNotificationAccount = () => {
    const configNotification = useSelector(state => state.notifications.notifications);
    const [notification, saveNotification] = useState('');

    const submitNotification = e => {
        e.preventDefault();
        const storedUserData = sessionStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        const id = userData._id;
    }

    return (
        <div className={Styles.container}>
            <Header />
            <div className={Styles.instructions}>
                <h1>Configuracion de Notificaciones</h1>
                <p>Estas por configurar las notificaciones de la siguiente cuenta</p>
                <p>{configNotification.nombreGoogle}</p>
                <p>{configNotification.googleMail}</p>
                <div className={Styles.formContainer}>
                    <form
                        onSubmit={submitNotification}
                        className={Styles.form}
                    >
                        <div className={Styles.selectContainer}>
                            <select className={Styles.select} value={notification} onChange={e => saveNotification(e.target.value)}>
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

export default ConfigNotificationAccount;