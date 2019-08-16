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



class Login extends Component{
    state = {
        modal: true,
        email: '',
        password: '',
        msg: null,

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
    

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
  
        })
        
    }


    onSubmit = e => {
        e.preventDefault();

       const { email, password } = this.state;
       const user = {
           email, 
           password
       }

    //attempt to login
       this.props.login(user);

     
    }


    render(){
        
        let styles = {
            outer: {
                textAlign: "center",
                marginTop: "5%"
            },
            inner: {
                textAlign: "center",
            }
            
        }

        return (
            
            <Fragment>
                <div style={styles.outer} >
                    <h1 style={styles}>Trade Tracker</h1>

                    <Container>
                        <Jumbotron className="boxStyle loginBox" >
                        
                        <h1 style={styles.inner}>Login or Register</h1>

                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }

                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    

                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        className="mb-3"
                                        onChange={this.onChange}
                                        />

                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="mb-3"
                                        onChange={this.onChange}
                                        />
                                    <Button
                                        color="dark"
                                        style={{marginTop: '2rem'}}
                                        block>
                                            Login</Button>
                                </FormGroup>
                            </Form>
                        </Jumbotron>
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
 