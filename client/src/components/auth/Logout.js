import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    handleLogout = () => {
        this.props.history.push('/login')
        this.props.logout();
        
        
    }
  
 
    render(){
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(withRouter(Logout));