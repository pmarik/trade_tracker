import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LandingNav from './LandingNav';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    Jumbotron
} from 'reactstrap';


const LandingPage = () => {
  return (
   
    <React.Fragment>
        <LandingNav /> 

        <Container>
            <div className="landingTop">
                <h1>Trade Tracker</h1>
                <h2>Trade Tracker is an interactive trading journal designed to give you an easy way to track your trading progress and improve your skills.</h2>
            </div>
        </Container>

            <div className="landingMid">
                <Container>
                    <p>Give Trade Tracker interactive journal a try with a free 30 day trail, no strings attached!</p>
                    <img src={require("../images/candles.png" )} height="300px" /> 
                </Container>
                
            </div>


        

    </React.Fragment>
 
  );
}

export default LandingPage;
