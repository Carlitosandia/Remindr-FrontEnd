// We import the the dependencies from react
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

//Dependencies for styles
import StylesCard from './stylesCard.module.css'
import Styles from './loginUser.module.css'
import { loginUserAction } from "../actions/userActions";
import Swal from "sweetalert2";


//Creates a functional component that will contain the the login page
const LoginUser = () => {
    //Define navigate
    const Navigate = useNavigate();
    //States from the component
    const [email, saveEmail] = useState('');
    const [password, savePassword] = useState('');

    //We use the dispatch to create a function 
    const dispatch = useDispatch();
    const logUser = (user) => dispatch(loginUserAction(user));

    const submitLogging = async e => {
        //Prevent the default action
        e.preventDefault();
        //Validate the form
        if (email.trim() === '') {
            //Show an alert if the email is missing
            Swal.fire({
                icon: 'error',
                title: 'Falto el correo',
                text: 'Hubo un error'
            });
            return;
        }
        if (password.trim() === '') {
            //Show an alert if the password is missing
            Swal.fire({
                icon: 'error',
                title: 'Falto la password',
                text: 'Hubo un error'
            });
            return;
        }
        //If there are no errors
        const login = await logUser({ email, password });
        console.log(login);
        if (login) {
            //Redirect the user to the home page
            Navigate('/home');
        }else{
            //Show an alert if the user is not logged
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesion',
                text: 'Contraseña o correo incorrectos'
            });
        }
    }

    return (
        <div className={StylesCard.container}>
            <div className={Styles.card}>
                <div className={StylesCard.cardBody}>
                    <h2>Iniciar Sesion</h2>
                    <form
                        onSubmit={submitLogging}
                    >
                        <div className={StylesCard.formGroup}>
                            <input
                                type="text"
                                className={StylesCard.formInput}
                                placeholder="Correo Electronico"
                                name="correo"
                                value={email}
                                onChange={e => saveEmail(e.target.value)}
                            />
                        </div>
                        <div className={StylesCard.formGroup}>
                            <input
                                type="text"
                                className={StylesCard.formInput}
                                placeholder="Contraseña"
                                name="contraseña"
                                value={password}
                                onChange={e => savePassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            className={StylesCard.btnSubmit}
                            value="Ingresar"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;