//Dependencias de react
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

//Dependencias propias
import NewUser from './components/newUser';
import RegisterUser from './components/registerUser';
import LoginUser from './components/loginUser';
import RegisterNumber from './components/registerNumber';
import AuthNumber from './components/authNumber';
import Home from './components/home';
import ConfigNotificationAccount from './components/configNotificationAccount';
import ConfigNotificationCourse from './components/configNotificationCourse';
import ConfigNotificationWork from './components/configNotificationWork';

function App() {
  return (
    <Router>
       <Provider store={store}>
         <Routes>
            <Route path="/" element = {<NewUser />}></Route>
            <Route path='/login' element = {<LoginUser />}></Route>
            <Route path='/register' element = {<RegisterUser />}></Route>
            <Route path='/registerNumber' element={<RegisterNumber />}></Route>
            <Route path='/authNumber' element={<AuthNumber/>}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/configure/accounts/:id' element={<ConfigNotificationAccount />}></Route>
            <Route path='/configure/courses/:id' element={<ConfigNotificationCourse />}></Route>
            <Route path='/configure/works/:id' element={<ConfigNotificationWork />}></Route>
         </Routes>
       </Provider>
    </Router>
  );
}

export default App;
