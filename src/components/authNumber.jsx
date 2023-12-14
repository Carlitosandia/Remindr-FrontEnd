import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import StylesCard from './stylesCard.module.css'
import Styles from './authNumber.module.css';
import { saveUserAction } from "../actions/userActions";
import Swal from "sweetalert2";

const AuthNumber = () => {
    //definimos navigate
    const Navigate = useNavigate();
    //Access the state from the store
    const user = useSelector(state => state.users.users);
    const number = useSelector(state => state.phones.phones);
    //States del componente
    const [userToken, saveUserToken] = useState('');

    //Set the dispatch
    const dispatch = useDispatch();
    //We use the dispatch to create a function in the const saveUser
    const saveUser = (user) => dispatch(saveUserAction(user));

    const submitToken = e => {
        //Prevent the default action
        e.preventDefault();
        //Validate the token
        const serverToken = number[0].token;
        if(!(serverToken === userToken)){
            //Show an alert if the token is not correct
            Swal.fire({
                icon: 'error',
                title: 'Error al verificar el token',
                text: 'El token no coincide'
            });
            return;
        }else{
            //Save the user data in constants
            const name = user[0].name;
            const lastName = user[0].lastName;
            const email = user[0].email;
            const password = user[0].password;
            const phone = number[0].number;

            //Execute the action to save the user
            saveUser({
                name,
                lastName,
                email,
                password,
                phone
            }).then(() => {
                //Redirect the user to the login page
                Navigate('/login');
            }).catch((error) => {
                //Show an alert if the user is not saved
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar el usuario',
                    text: 'Hubo un error al guardar el usuario'
                });
            })
        }
    }

    return (
        <div className={StylesCard.container}>
            <div className={Styles.card}>
                <div className={StylesCard.cardBody}>
                    <h2>Verificar Numero</h2>
                    <p>Ingresa el código de seguridad de 6 digitos que se envió a tu número de teléfono.</p>
                    <form
                    onSubmit={submitToken}
                    > 
                        <div className={Styles.formGroup}>
                        <input
                            type="text"
                            className={Styles.formInput}
                            maxLength={6}
                            placeholder="Codigo"
                            name="codigo"
                            value={userToken}
                            onChange={e => saveUserToken(Number(e.target.value))}
                        />
                        </div>
                        <div className={Styles.formGroup}>
                        <input
                            type="submit"
                            className={StylesCard.btnSubmit}
                            value="Verificar"
                        />
                        </div>
                    </form>
                    <p>¿No se envio un codigo de seguridad?</p>                
                    </div>
            </div>
        </div>
    );
}
export default AuthNumber;