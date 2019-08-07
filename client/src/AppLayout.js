import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavbar"
import TradeList from './components/TradeList';
import Stats from './components/Stats'
import Watchlist from "./components/WatchList";


const AppLayout = () => {
  return (
   
    <Router>
        <AppNavBar/> 

        <Route path="/journal" component={TradeList} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/progress" component={Stats} /> 
    </Router>
 
  );
}

export default AppLayout;
