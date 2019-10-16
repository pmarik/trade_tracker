import React, { Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from 'reactstrap'
import {NavLink } from 'react-router-dom'
import LandingPage from './LandingPage';
import Login from './auth/Login';





class LandingNav extends Component {
        state = {
            isOpen: false
        }


        toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }

        

        render() {

            return ( 
            <div>
                <Navbar expand="sm" className="mb-5 navBar">
                    <div className="container">
                        <NavbarBrand className="nav-brand">Trade Tracker</NavbarBrand>
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar className="nav-landing">
                            <NavLink to="/home" exact className="nav-item" component={LandingPage}>Home</NavLink>
                            <NavLink to="/login" className="nav-item" component={Login}>Login</NavLink>

                        </Collapse>
                        
                    </div>
                </Navbar>
            </div>
            
            );
           
        }
}



export default LandingNav;