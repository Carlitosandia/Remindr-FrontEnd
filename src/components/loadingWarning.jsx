//We import the the dependencies from react
import React from "react";
import { Link } from 'react-router-dom';

//We import the styles
import logo from '../pictures/logoremindr.png'
import Styles from './loadingWarning.module.css'

//Creates a functional component that will contain the welcome page
const LoginWarning = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.logoRemindr}>
                <img src={logo} alt={logo} className={Styles.smallImg} ></img>
            </div>
            <p className={Styles.title}>Cargando la informacion...</p>
        </div>
    );
}

export default LoginWarning;