//React dependencies
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

//Styles imports
import Styles from './configNotification.module.css';
import Header from "./Header";
import logoClassroom from '../pictures/google-classroom.png';


const ConfigNotificationCourse = () => {
    //Access the data from the state
    const configNotification = useSelector(state => state.notifications.notifications);

    //Component states
    const [notification, saveNotification] = useState('');

    //On submit function
    const submitNotification = e => {
        //Prevent default action
        e.preventDefault();
        //Access the session storage data
        const storedUserData = sessionStorage.getItem('userData');
        //Parse the data to json
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        //Access the id from the user
        const userId = userData._id;
        //Access the id from the work
        const workId= configNotification._id;
    }


    return (
        <div className={Styles.container}>
            <Header />
            <div className={Styles.instructions}>
                <h1>Configuracion de Notificaciones</h1>
                <p>Estas por configurar las notificaciones de la siguiente clase</p>
                <p>{configNotification.nameCourse}</p>
                <div className={Styles.btnClassroomContainer}>
                    <Link to={configNotification.courseLink} className={Styles.btnLinkClassroom}>
                        <div className={Styles.imgContainer}>
                            <img src={logoClassroom} alt="logo classroom" className={Styles.smallImg}></img>
                        </div>
                        <div className={Styles.textLinkContainer}>
                            <p className={Styles.textLink}>Ir a la clase</p>
                        </div>
                    </Link>
                </div>
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

export default ConfigNotificationCourse;