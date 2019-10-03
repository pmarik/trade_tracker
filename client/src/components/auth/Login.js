import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { withRouter } from 'react-router-dom'
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
import LandingNav from '../LandingNav';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


class Login extends Component{
    state = {
        modal: true,
        email: '',
        password: '',
        msg: null,
        loginRegisterSwap: false,

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            //check for register error 
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg })

            }
            else{
                this.setState({ msg: null })
            }
        }
        
        //if authenticated then redirect to main app
            if(isAuthenticated){
                this.props.history.push("/journal")
            }
        
    }
    

    
    toggleRegister = () => {
      
        this.props.clearErrors();
        if (!this.state.loginRegisterSwap)
        this.setState({
           loginRegisterSwap: true
        })
    }

    toggleLogin = () => {
        this.props.clearErrors();
        if (this.state.loginRegisterSwap){
            this.setState({
                loginRegisterSwap: false
            });
        }
       
    }


    


    render(){
        
        let styles = {
            outer: {
                textAlign: "center",
                marginTop: "0%"
            },
            logo: {
                marginTop: 0,
                color: "#FFF",
            },
            hr: {
                width: "60%",
                height: "1px",
                margin: "0 auto",
                backgroundColor: "#E2953B"
            },
            
            
        }


        let loginbckgrnd = !this.state.loginRegisterSwap ? {background: "#E2953B"} : {background: "none"};
        let regbckgrnd = this.state.loginRegisterSwap ? {background: "#A4243B"} : {background: "none"};
    

        return (
            
            <Fragment>

                <LandingNav /> 


                <div style={styles.outer} >
                   

                    <Container>
                        <div className="boxStyle loginBox" >
                            <h1 style={styles.logo}>Trade Tracker</h1>
                            <hr style={styles.hr}/>
                            <div className="loginRegister-Btns">
                                <span style={loginbckgrnd}><button onClick={this.toggleLogin}>Login</button></span> 
                                <span style={regbckgrnd}><button onClick={this.toggleRegister}>Register</button></span>
                            </div>

                            {this.state.loginRegisterSwap ? <RegisterForm/> : <LoginForm/>}

                        </div>
                    </Container>
                </div>
            </Fragment>

           
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})


export default connect(mapStateToProps, { login, clearErrors })(withRouter(Login))
 