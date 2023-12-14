//Dependencies from react
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

//Dependencies for styles
import StylesCard from './stylesCard.module.css'
import Styles from './registerUser.module.css'
import Swal from "sweetalert2";

//Redux Actions
import { createUserAction } from "../actions/userActions";


const RegisterUser = () => {
    const Navigate = useNavigate();
    //State del componente
    const [name, saveName] = useState('');
    const [lastName, saveLastname] = useState('');
    const [email, saveEmail] = useState('');
    const [password, savePassword] = useState('');
    const [comparative, validatePassword] = useState('');

    //Access to the state from the store
    const loading = useSelector(state =>state.users.loading);
    //Set dispatch
    const dispatch = useDispatch();
    //We use the dispatch to create a function
    const createUser = (user) => dispatch(createUserAction(user));
    const submitNewUser = e => {
        //Prevent the default action
        e.preventDefault();
        //Validate the form
        if (name.trim() === '') {
            //Show an alert if the name is missing
            Swal.fire({
                icon: 'error',
                title: 'Falto el nombre',
                text: 'Debes ingresar un nombre'
            });
            return;
        }
        if (lastName.trim() === '') {
            //Show an alert if the last name is missing
            Swal.fire({
                icon: 'error',
                title: 'Falta el apellido',
                text: 'Debes ingresar un apellido'
            });
            return;
        }
        if (email.trim() === '') {
            //Show an alert if the email is missing
            Swal.fire({
                icon: 'error',
                title: 'Falto el correo',
                text: 'Debes ingresar un correo'
            });
            return;
        }
        if (!(password === comparative)) {
            //Show an alert if the passwords are not the same
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Debes ingresar contraseñas iguales'
            });
            return;
        }

        //If there are no errors
        //create the new user
        createUser({
            name,
            lastName,
            email,
            password
        }).then(() => {
            //Redirect the user to register the number
            Navigate('/registerNumber');
        }).catch((error) => {
            //Show an alert if the user is not created
            console.log('Error al crear usuario:', error);
        });
    }

    return (
        <div className={StylesCard.container}>
            <div className={StylesCard.card}>
                <div className={Styles.cardBody}>
                    <h2 className={StylesCard.title}>Crea una cuenta</h2>
                    <form
                        onSubmit={submitNewUser}
                    >
                        <div className={Styles.formGroup}>
                            <input
                                type="text"
                                className={Styles.formInput}
                                placeholder="Nombre"
                                name="nombre"
                                value={name}
                                onChange={e => saveName(e.target.value)}
                            />
                        </div>
                        <div className={Styles.formGroup}>
                            <input
                                type="text"
                                className={Styles.formInput}
                                placeholder="Apellido"
                                name="apellido"
                                value={lastName}
                                onChange={e => saveLastname(e.target.value)}
                            />
                        </div>
                        <div className={Styles.formGroup}>
                            <input
                                type="text"
                                className={Styles.formInput}
                                placeholder="Correo Electronico"
                                name="correo"
                                value={email}
                                onChange={e => saveEmail(e.target.value)}
                            />
                        </div>
                        <div className={Styles.formGroup}>
                            <input
                                type="text"
                                className={Styles.formInput}
                                placeholder="Contraseña"
                                name="contraseña"
                                value={password}
                                onChange={e => savePassword(e.target.value)}
                            />
                        </div>
                        <div className={Styles.formGroup}>
                            <input
                                type="text"
                                className={Styles.formInput}
                                placeholder="Confirmar Contraseña"
                                name="contraseña"
                                value={comparative}
                                onChange={e => validatePassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            className={StylesCard.btnSubmit}
                            value="Agregar"
                        />
                    </form>
                    <p>¿Ya tienes una cuenta?
                        <Link to={'/register'} className={Styles.btn}>
                            Inicia Sesión
                        </Link>
                    </p>
                    { loading ? <p>Cargando...</p>: null}
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;