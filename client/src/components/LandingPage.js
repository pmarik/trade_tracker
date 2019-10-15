import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LandingNav from './LandingNav';
import {Link, withRouter } from 'react-router-dom'
import Login from './auth/Login';
import {
    Button,
    Container
} from 'reactstrap';
import '../componentStyles/landingPage.css';

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
                <Container className="attempt">
                    <div className="tryHeader">
                        <p>Give Trade Tracker interactive journal a try with a free 30 day trail, no strings attached!</p>
                        <Button><Link to="/login" component={Login}>Sign Up!</Link></Button>
                    </div>
                </Container>

            </div>

        <Container>
            <div className="trackSection">
                <p>You can’t improve what you don’t measure. Start logging your trades with Trade Tracker to get unique insight into how you are progressing with your trading career</p>
                <span className="logtradesvisual">
                    <img src={require('../images/papeJournal.svg')} alt="paper journal" />
                    <img src={require('../images/progressUP.svg')}  alt="progress chart"/>
                    <img src={require('../images/moneyUP.svg')} alt="money track"/>
                </span>
            </div>

            <div className="landingPreview">
                <div className="previews">
                    <div className="previewSection">
                        <p>Full journal of trades with automatic data insights</p>
                        <img src={require("../images/journal.JPG")} alt="trade tracker journal" /> 
                    </div>

                    <div className="previewSection">
                        <p>Easily calculate risk and make watchlists for each trade </p>
                        <img src={require("../images/watchlist.JPG")} alt="trade tracker watchlist" /> 
                    </div>

                    <div className="previewSection">
                        <p>Get an overview of your total progress and gain understanding of your strategies</p>
                        <img src={require("../images/progress.JPG")} alt="trade tracker progress" /> 
                    </div>
                </div>
            </div>
        </Container>

        <div className="loginBanner">
                <p><Link to="/login" component={Login}>Login</Link> to access your Trade Tracker interactive journal</p>
        </div>

        <div className="freeTrialBottom">
            <p>Don’t have an account?</p>
            <p> Sign up for a free 30 day trail account, no strings attached! </p>
        </div>

        <footer>

        </footer>
    </React.Fragment>
 
  );
}

export default LandingPage;
