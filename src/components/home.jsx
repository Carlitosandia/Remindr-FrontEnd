//React dependencies
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//We import the components
import Header from "./Header";
import NewUserClassroomRegister from "./registerClassroom";
import ClassroomRegisters from "./classroomRegister";
import LoadingWarning from "./loadingWarning";

//We import the actions
import { getGoogleAccountsAction } from "../actions/googleActions";

const Home = () => {
    //Configurate the constant to verify if its loading
    const [isLoading, setIsLoading] = useState(true);
    //Access the state from the session storage
    const storedUserData = sessionStorage.getItem('userData');
    //Parse the data to json
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    //Access the id from the user
    const id = userData._id;
    //Access the state from the store
    const googleAccount = userData.googleAccounts;
    //Access the dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        //Get the accounts from the user
        const getAccount = async (id) => {
            //Execute the action to get the accounts
            const accounts = await dispatch(getGoogleAccountsAction(id));
            //Set the loading state to false
            setIsLoading(false);
        };
        //Execute the function
        getAccount(userData._id);
    }, []);

    return (
        //We use fragment to use more than one component
        <Fragment>
            {/* Import the header to display in screen */}
            <Header />
            {/* If loading is true show loading and doesnt load the Components */}
            {isLoading && <LoadingWarning />}
            {/* If there are google accounts it will show Classroom registers, if it isnt it will show New User Classroom Register */}
            {!isLoading && googleAccount.length === 0 && <NewUserClassroomRegister />}
            {!isLoading && googleAccount.length > 0 && <ClassroomRegisters />}
        </Fragment>
    );
}

export default Home;