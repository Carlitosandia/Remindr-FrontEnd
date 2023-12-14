//React dependencies
import React from "react";
import { Link } from 'react-router-dom';

//Styles imports
import logo from '../pictures/logoremindr.png'
import Styles from './Header.module.css'

const Header = () => {
    //Access the data from the session storage
    const storedUserData = sessionStorage.getItem('userData');
    //Parse the data to json
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    //Access the name and last name from the user
    const name = userData.name;
    const lastName = userData.lastName;

    return (
        <nav className={Styles.navbarExpand}>
            <div className={Styles.container}>
                <div>
                    <img src={logo} alt={logo} className={Styles.smallImg} ></img>
                    <Link to={'/'} className={Styles.title}>
                        ReMindR
                    </Link>
                </div>
                <div className={Styles.cuenta}>
                    <p className={Styles.name}>{name} {lastName}</p>
                </div>
            </div>
        </nav>
    );
}

export default Header;