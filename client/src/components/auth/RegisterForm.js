import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import '../../componentStyles/registerForm.css';

class RegisterForm extends Component{
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            //check for register error 
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg })
            }
            else{
                this.setState({ msg: null })
            }
        }
        
        //if authenticated then close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }
    
    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        //create user object
        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser);

        
    }

    render(){
        return (
            <div>
               
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit} className="registerForm">
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    />

                                <Label for="email">Email</Label>
                                <Input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    />

                                <Label for="password">Password</Label>
                                <Input
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    />
                                <Button
                                    style={{marginTop: '2rem'}}
                                    block>
                                        Register</Button>
                            </FormGroup>
                        </Form>
                 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterForm)