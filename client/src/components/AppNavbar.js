import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from 'reactstrap'
import {NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../actions/authActions'
import WatchList from './watchlist/WatchList'
import Progress from './progress/Progress'
import TradeList from './journal/TradeList';


class AppNavbar extends Component {
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

        handleLogout = () => {
            this.props.logout()
            this.props.history.push('/')
        }

        render() {
            const { isAuthenticated, user } = this.props.auth;


            const logoutButton = (
                <a onClick={this.handleLogout} className="logout-btn">Logout</a>
            )



        

            return ( 
            <div>
                <Navbar expand="sm" className="mb-5 navBar">
                    <div className="container">
                        <NavbarBrand className="nav-brand">Trade Tracker</NavbarBrand>
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <NavLink to="/journal" className="nav-item" component={TradeList}>Journal</NavLink>
                            <NavLink to="/watchlist" className="nav-item" component={WatchList}>Watchlist</NavLink>
                            <NavLink to="/progress" className="nav-item" component={Progress}>Progress</NavLink>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated && logoutButton }
                            </Nav>
                            
                        </Collapse>
                        
                    </div>
                </Navbar>
            </div>
            
            );
           
        }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logout })(AppNavbar));