//React dependencies
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

//Dependencies for styles
import StylesCard from './stylesCard.module.css'
import Styles from './registerNumber.module.css'
import Swal from "sweetalert2";

//Import the actions
import { setPhoneAction } from "../actions/numberActions";


const RegisterNumber = () => {
    //definimos navigate
    const Navigate = useNavigate();
    //States del componente
    const [lada, saveLada] = useState('');
    const [number, saveNumber] = useState('');

    //We use the dispatch to create a function 
    const dispatch = useDispatch();
    //We use the dispatch to create a function in the const setPhone
    const setPhone = (phone) => dispatch(setPhoneAction(phone));

    const submitPhone = async e => {
        //Prevent the default action
        e.preventDefault();
        if (lada.trim() === '') {
            //Show an alert if the lada is missing
            Swal.fire({
                icon: 'error',
                title: 'Falta de colocar lada',
                text: 'Ingresa la lada de tu numero de telefono'
            });
            return;
        }
        if (number.trim() === '') {
            //Show an alert if the number is missing
            Swal.fire({
                icon: 'error',
                title: 'Falta de colocar numero',
                text: 'Ingresa el numero de tu telefono'
            });
            return;
        }
        //Execute the action to set the phone
        const sendToken = await setPhone({lada,number})
        //If the token is sent
        if(sendToken === true){
            //Redirect the user to the authNumber page
            Navigate('/authNumber');   
        }else{
            //Show an alert if the token is not sent
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el token',
                text: 'Hubo un error al enviar el token'
            });
        }
    }

    return (
        <div className={StylesCard.container}>
            <div className={Styles.card}>
                <div className={StylesCard.cardBody}>
                    <h2 className={StylesCard.title}>Ingresa tu numero de telefono</h2>
                    <form
                        onSubmit={submitPhone}
                    >
                        <div className={Styles.numberContainer}>
                            <div className={Styles.formGroup}>
                                <p className={Styles.formText}>Lada</p>
                                <input
                                    type="text"
                                    className={Styles.formLada}
                                    maxLength={3}
                                    placeholder="+"
                                    name="lada"
                                    value={lada}
                                    onChange={e => saveLada(e.target.value)}
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <p className={Styles.formText}>Numero</p>
                                <input
                                    type="text"
                                    className={Styles.formNumber}
                                    maxLength={10}
                                    placeholder="Numero"
                                    name="numero"
                                    value={number}
                                    onChange={e => saveNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <input
                            type="submit"
                            className={StylesCard.btnSubmit}
                            value="Siguiente"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterNumber;