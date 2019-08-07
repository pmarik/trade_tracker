import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login'
import AppLayout from './AppLayout'
import  PrivateRoute from './components/ProtectedRoute'


 class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {

  return (
    <Provider store={store}>
      <Router>
    
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" component={AppLayout}></PrivateRoute>
          </Switch>
        
      </Router>
    </Provider>
   )
  }
}

export default App;