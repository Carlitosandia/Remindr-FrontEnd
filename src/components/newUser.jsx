//We import the the dependencies from react
import React from "react";
import { Link } from 'react-router-dom';

//We import the styles
import logo from '../pictures/logoremindr.png'
import Styles from './NewUser.module.css'

//Creates a functional component that will contain the welcome page
const NewUser = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.logoRemindr}>
                <img src={logo} alt={logo} className={Styles.mainImg} ></img>
                <p className={Styles.title}>ReMindR</p>
                <p className={Styles.slogan}>Notificaciones inteligentes para estudiantes</p>
                <p className={Styles.slogan}>inteligentes</p>
            </div>
            <div className={Styles.options}>
                <p className={Styles.textBold}>Vamos a empezar</p>
                <div className={Styles.btnContainer}>
                    <Link to={'/login'} className={Styles.btn}>
                        Iniciar Sesión
                    </Link>
                    <Link to={'/register'} className={Styles.btn}>
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NewUser;