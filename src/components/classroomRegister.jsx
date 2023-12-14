import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Styles from './classroomRegister.module.css';
import configuracion from '../pictures/configuraciones.png';

import { getElementNotificationAction } from "../actions/notificationActions";
import AddAccountBtn from "./addAccount";

const ClassroomRegisters = () => {
    //Access the state from the store
    const storedUserData = sessionStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const id = userData._id;

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const user = useSelector(state => state.googleAccounts.googleAccount[0]);
    const arrayAccounts = [];
    let arrayCoursesState = [];
    const arrayWorks = [];
    const arrayWorksData = [];
    for (const accounts of user) {
        arrayAccounts.push(accounts);
        arrayCoursesState = arrayCoursesState.concat(accounts.courses);
    }
    for (const courses of arrayCoursesState) {
        console.log(courses);
        if (courses.courseWorks.length > 0) {
            for (const courseWorks of courses.courseWorks) {
                arrayWorks.push(courseWorks);
            }
        }

    }
    for (const works of arrayWorks) {
        for (const worksData of works.works) {
            arrayWorksData.push(worksData);
        }
    }

 
    const redirectConfigurationAccounts = (selected) => {
        dispatch(getElementNotificationAction(selected));
        Navigate(`/configure/accounts/${selected._id}`);
    }
    const redirectConfigurationCourses = (selected) => {
        dispatch(getElementNotificationAction(selected));
        Navigate(`/configure/courses/${selected._id}`);
    }

    const redirectConfigurationWorks = (selected) => {
        dispatch(getElementNotificationAction(selected));
        Navigate(`/configure/works/${selected._id}`);
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.card}>
                <h2 className={Styles.title}>Cuentas</h2>
                <hr></hr>
                {arrayAccounts.map(arrayAccounts => (
                    <div className={Styles.cardContent} key={arrayAccounts._id}>
                        <div className={Styles.cardContentAccount}>
                        <p className={Styles.googleMail} >{arrayAccounts.googleMail}</p>
                        <p className={Styles.googleName} >{arrayAccounts.nombreGoogle}</p>
                        </div>
                        <div className={Styles.btnContainer}>
                        <button className={Styles.btnConfig}
                        onClick={() => redirectConfigurationAccounts(arrayAccounts)}>
                            <img src={configuracion} alt={configuracion}></img>
                        </button>
                        </div>
                    </div>
                ))}
                <AddAccountBtn />
            </div>
            <div className={Styles.card}>
                <h2 className={Styles.title}>Clases</h2>
                <hr></hr>
                {arrayCoursesState.map(arrayCoursesState => (
                    <div className={Styles.cardContent} key={arrayCoursesState._id}>
                        <div className={Styles.cardContentCourses}>
                        <p className={Styles.courseName}>{arrayCoursesState.nameCourse}</p>
                        <p className={Styles.courseDescription}>{arrayCoursesState.descriptionCourse}</p>
                        </div>
                        <div className={Styles.btnContainer} >
                        <button className={Styles.btnConfig} 
                        onClick={() => redirectConfigurationCourses(arrayCoursesState)}>
                            <img src={configuracion} alt={configuracion}></img>
                        </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={Styles.card}>
                <h2 className={Styles.title}>Tareas</h2>
                <hr></hr>
                {arrayWorksData.map(arrayWorksData => (
                    <div className={Styles.cardContent} key={arrayWorksData._id}>
                        <div className={Styles.cardContentWorks}>
                        <p className={Styles.works}>{arrayWorksData.title}</p>
                        </div>
                        <div className={Styles.btnContainer}>
                        <button className={Styles.btnConfig} onClick={() => redirectConfigurationWorks(arrayWorksData)}>
                            <img src={configuracion} alt={configuracion}></img>
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClassroomRegisters;