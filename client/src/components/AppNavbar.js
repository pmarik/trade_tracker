import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout'
import WatchList from './WatchList'
import Stats from './Stats'
import TradeList from './TradeList';

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

        render() {
            const { isAuthenticated, user } = this.props.auth;

            const authLinks = (
                <Fragment>
                    <NavItem>
                        <span className="navbar-text mr-3">
                            <strong>{ user ? `User ${user.name}` : '' }</strong>
                        </span>
                    </NavItem>
                    <NavItem>
                         <Logout /> 
                    </NavItem>
                </Fragment>
            )

            const guestLinks = (
                <Fragment>
                    <NavItem>
                        <RegisterModal/>
                    </NavItem>
                    <NavItem>
                        <LoginModal/>
                    </NavItem>
                </Fragment>
            );

            return ( 
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Trade Tracker</NavbarBrand>
                        <NavLink href="/journal" component={TradeList}>Journal</NavLink>
                        <NavLink href="/watchlist" component={WatchList}>Watchlist</NavLink>
                        <NavLink href="/progress" component={Stats}>Progress</NavLink>
                        <NavbarToggler onClick={this.toggle} /> 
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                
                                { isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
            
            );
           
        }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);