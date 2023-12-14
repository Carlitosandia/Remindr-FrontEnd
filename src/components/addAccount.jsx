// React dependencies
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//We import the styles
import Styles from './addAccount.module.css';

//We import the actions
import { registerGoogleAccountAction } from "../actions/googleActions";

const AddAccountBtn = () => {
    //Access the data from the session storage
    const storedUserData = sessionStorage.getItem('userData');
    //Parse the data to json
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    //Access the id from the user
    const id = userData._id;

    //Access the data from the session storage
    const storedGoogleData = sessionStorage.getItem('googleData');
    //Parse the data to json
    const googleData = storedGoogleData ? JSON.parse(storedGoogleData) : null;

    // Set the dispatch function
    const dispatch = useDispatch();

    // States del componente
    const [popup, setPopup] = useState(null);
    // Función para agregar la cuenta de google
    const addClassroom = (googleData) => dispatch(registerGoogleAccountAction(googleData));

    useEffect(() => {
        //Function to handle the window message
        const handleWindowMessage = (event) => {
            //Verify if the origin is the same as the server
            if (event.origin === "http://localhost:5050") {
                //Verify if the data exists
                if (event.data) {
                    //Save the data in the session storage
                    sessionStorage.setItem('googleData', JSON.stringify(event.data));
                    // Execute the action to add the google account
                    addClassroom({ googleData: event.data, id }).then(() => {
                        //Close the window
                        popup.close();
                    });
                }
            }
        };

        // Agregar event listener al montar el componente
        window.addEventListener("message", handleWindowMessage);

        // Limpiar event listener al desmontar el componente
        return () => {
            window.removeEventListener("message", handleWindowMessage);
        };
    }, [id, popup]);

    return (
        <div className={Styles.container}>
            <div>
                <button
                    type="submit"
                    className={Styles.btnSubmitAddAccount}
                    onClick={() => {
                        //Open a new window
                        const newPopup = window.open(
                            "http://localhost:5050/auth/google",
                            "targetWindow",
                            `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=620,
                                    height=700
                                    `);
                        setPopup(newPopup);
                    }}
                >Agregar Cuenta</button>
            </div>
        </div>
    );
}

export default AddAccountBtn;
