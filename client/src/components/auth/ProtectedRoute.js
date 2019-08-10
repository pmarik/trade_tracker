import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = rest;
  
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
      )}
      />
    );
  };
  
  PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
  
export default connect(mapStateToProps, null, null, {pure: false})(withRouter(PrivateRoute));


