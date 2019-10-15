import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingNav from './components/LandingNav';
import "./componentStyles/lostPage.css";
import {Link } from 'react-router-dom'
import Login from './components/auth/Login';
import LandingPage from './components/LandingPage';



const LostPage = () => {

    return (
        <React.Fragment>
            <LandingNav /> 
            <div className="lostPage">
               <h1>Please return back to the <Link to="/home" component={LandingPage}>Home</Link> page or <Link to="/login" component={Login}>Login</Link></h1>
            </div>
        </React.Fragment>
    )
}


export default LostPage;