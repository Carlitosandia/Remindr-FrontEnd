//React dependencies
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//We import the styles
import StylesCard from './stylesCard.module.css';
import Styles from './registerClassroom.module.css';
import logoClassroom from '../pictures/google-classroom.png';

//We import the actions
import { registerGoogleAccountAction } from "../actions/googleActions";

const NewUserClassroomRegister = () => {
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

    //Set the dispatch function
    const dispatch = useDispatch();

    // Components states
    const [popup, setPopup] = useState(null);
    // Function to add the google account
    const addClassroom = (googleData) => dispatch(registerGoogleAccountAction(googleData));

    useEffect(() => {
        // Function to handle the window message
        const handleWindowMessage = (event) => {
            //Verify if the origin is the same as the server
            if (event.origin === "http://localhost:5050") {
                //Verify if the data exists
                if (event.data) {
                    //Save the data in the session storage
                    sessionStorage.setItem('googleData', JSON.stringify(event.data));
                    //Execute the action to add the google account
                    addClassroom({ googleData: event.data, id }).then(() => {
                        //Close the window
                        popup.close();
                    });
                }
            }
        };

        // Add an evenet listener when the component is mounted
        window.addEventListener("message", handleWindowMessage);

        // Clean the event listener when the component is unmounted
        return () => {
            window.removeEventListener("message", handleWindowMessage);
        };
    }, [id,popup]);

    return (
        <div className={StylesCard.container}>
            <div className={Styles.card}>
                <div className={Styles.cardBody}>
                    <img src={logoClassroom} alt={logoClassroom} className={Styles.smallImg}></img>
                    <div>
                        {/* Creates a button to open a window that request a get petition to our server, this to authenticate with google */}
                        <button
                            type="submit"
                            className={Styles.btnSubmit}
                            onClick={() => {
                                //Open the window
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
            </div>
        </div>
    );
}

export default NewUserClassroomRegister;
