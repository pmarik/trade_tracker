import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from "react-router-dom";
import AppNavBar from "./AppNavbar"
import TradeList from './journal/TradeList';
import Progress from './progress/Progress'
import Watchlist from "./watchlist/WatchList";
import UpdateModal from './journal/updateModal'


const AppLayout = () => {
  return (
   
    <Router>
        <AppNavBar/> 

        <Route path="/journal" component={TradeList} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/progress" component={Progress} /> 
        <Route path="/update/:id" component={UpdateModal} />
    </Router>
 
  );
}

export default AppLayout;
