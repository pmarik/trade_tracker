import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from "./components/AppNavbar"
import TradeList from './components/TradeList';
import Login from './components/auth/Login'
import Stats from './components/Stats'
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';



import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from "react-router-dom";

import Watchlist from "./components/WatchList";

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavBar/> 
       
          <Route path="/" exact component={Login} />
          <Route path="/journal" component={TradeList} />
          <Route path="/watchlist" component={Watchlist} />
          <Route path="/progress" component={Stats} /> 
     
        </div>
      </Router>
    </Provider>
  );
  }
}

export default App;
