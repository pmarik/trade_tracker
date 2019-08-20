import React, { Component } from 'react';
import PortfolioValue from './PortfolioValue'
import Calculator from './Calculator'
import ShareResult from './ShareResult'
import { connect } from 'react-redux';
import { setRiskPercent, setPortfolioValue, calculateRisk, resetStateCalculator, handleCalculatorChange, addWatchlistItem, getTotalPortfolio} from '../../actions/watchActions'
import uuid from 'uuid';

class RiskCalculator extends Component {

    
    state = {
        isLong: false,
        canAfford: false,
        isVisible: false,
        numDayTrades: 0,
        ticker: ''

    }

    parseDate = (input) => {
        // Transform date from text to date
        if(typeof input === "string"){
        var parts = input.match(/(\d+)/g);
// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
        }
        else{
            return input
        }
 }

    workingDaysBetweenDates = (d0, d1) => {
        var startDate = this.parseDate(d0);
        var endDate = this.parseDate(d1);  
        // Validate input
        if (endDate < startDate)
            return 0;
    
        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0,0,0,1);  // Start just after midnight
        endDate.setHours(23,59,59,999);  // End just before midnight
        var diff = endDate - startDate;  // Milliseconds between datetime objects    
        var days = Math.ceil(diff / millisecondsPerDay);
    
        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days = days - (weeks * 2);
    
        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();
    
        // Remove weekend not previously removed.   
        if (startDay - endDay > 1)         
            days = days - 2;      
    
        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6)
            days = days - 1  
    
        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0)
            days = days - 1  
        
        return days;
        
    }

    

    componentDidMount(){
        const { items } = this.props.item;
        let totalPl = 0;

        if(items.length > 0 ){
            totalPl = items.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ));

            this.props.getTotalPortfolio(totalPl.pL);

            //current day
            const today = new Date();

            //get dates of previous trades
            let tradeDates = items.map(trade => { return trade.entryDate})
            
            //filter the trades in the past 5 trading days
            let tradesInPast5Days = tradeDates.filter(date => {
                if (this.workingDaysBetweenDates(date, today) <= 5){
                    return true;
                }
            })

            this.setState({
                numDayTrades: tradesInPast5Days.length
            })

          
        }
      

    }
    

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

            if (name === "riskPercent"){
                let newRisk = this.props.totalPortfolio * (value * .01);
                this.props.setRiskPercent(value, newRisk)
            }
            // else if(name === "ticker"){
            //     this.setState({
            //         ticker: value
            //     })
            // }
           
            else {
                this.props.handleCalculatorChange(name, value)
            }
        
        
       
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isVisible: true
        })
    }


    calculate = () => {
        const numOfShares = this.props.riskDollarValue / (this.props.buyPrice - this.props.stopPrice);
        const totalShares = Math.abs(Math.round(numOfShares));
        const totalPrice = totalShares * this.props.buyPrice;
        let canAfford = false; 

        if(totalPrice < this.props.totalPortfolio - 20) {
            canAfford = true;
        }

        const target = parseFloat(this.props.buyPrice) + parseFloat(((this.props.buyPrice - this.props.stopPrice) * 2))
       
        if(target < this.props.buyPrice){
            this.setState({
                isLong: false,
                canAfford
            })
        }
        else{
            this.setState({
                isLong: true,
                canAfford
            })
        }

        this.props.calculateRisk(target, totalPrice, totalShares)

        if(canAfford){
            const id = uuid();
            this.props.addWatchlistItem(this.props.ticker, totalShares, this.props.buyPrice, this.props.stopPrice, id)
        }
     
    }

    resetCaculator = () => {
        this.setState({
            isLong: true,
            isVisible: false
        })

        this.props.resetStateCalculator();
    }

    render() {


        return (
            <div>
                <PortfolioValue portfolio={this.props.totalPortfolio} riskPercent={this.props.riskPercent} riskDollarValue={this.props.riskDollarValue} numDayTrades={this.state.numDayTrades} handleChange={this.handleChange} /> 
                <hr /> 
                <Calculator handleSubmit={this.handleSubmit} handleChange={this.handleChange} ticker={this.props.ticker} buyPrice={this.props.buyPrice} stopPrice={this.props.stopPrice} calculate={this.calculate} resetCaculator={this.resetCaculator} /> 
                <hr /> 
                {this.state.isVisible && <ShareResult numShares={this.props.numShares} totalPrice={this.props.totalPrice} ticker={this.props.ticker} isLong={this.state.isLong} stopPrice={this.props.stopPrice} target={this.props.target} canAfford={this.state.canAfford}/> }


            </div>
        )
    }
}


const mapStateToProps = state => ({
    watchlist: state.watch.watchlist,
    portfolio: state.watch.portfolio,
    riskPercent: state.watch.riskPercent,
    riskDollarValue: state.watch.riskDollarValue,
    ticker: state.watch.ticker,
    buyPrice: state.watch.buyPrice,
    stopPrice: state.watch.stopPrice,
    numShares: state.watch.numShares,
    target: state.watch.target,
    totalPrice: state.watch.totalPrice,
    totalPortfolio: state.watch.totalPortfolio,
    item: state.item
})

export default connect(mapStateToProps, {setRiskPercent, setPortfolioValue, getTotalPortfolio, calculateRisk, resetStateCalculator, handleCalculatorChange, addWatchlistItem })(RiskCalculator)




