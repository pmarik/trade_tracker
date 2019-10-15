import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from 'reactstrap'
import {NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LandingPage from './LandingPage';
import Login from './auth/Login';





class LandingNav extends Component {
        state = {
            isOpen: false
        }

        static propTypes = {
            auth: PropTypes.object.isRequired
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