import React from 'react'
import { connect } from 'react-redux';

function parseDate(input) {
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

function datediff(first, second){
    return Math.round((second-first)/(1000*60*60*24));
}

const ShareResult = (props) => {

    const { items } = props.item;
    let prevTrade = '';
    if(items.length > 0 ){
             //get dates of previous trades
             let tradeTickers = items.map(trade => { return trade.ticker})
             let matchTicker = tradeTickers.filter(name => {
                 if(name.toLowerCase() === props.ticker.toLowerCase()){
                     return true
                 }
             })
            if(matchTicker.length > 0){
                let findPrevTrade = items.filter(trade => {
                    if(props.ticker.toLowerCase() === trade.ticker.toLowerCase()){
                        return true
                    }
                })

                    const today = new Date();
                
                    let lasttraded = datediff(parseDate(findPrevTrade[findPrevTrade.length - 1].exitDate), today)
    
                    prevTrade = (<p>You last traded this stock {lasttraded - 1} days ago</p>)
                
               
               
            }
            else{
                prevTrade = (<p>You have not traded this ticker before</p>)
            }
    }

    let afford = 
        <div>
            <p><strong>Number of shares going {props.isLong ? (<p style={{color: "green", display: "inline-block"}}>LONG</p>) : (<p style={{color: "red", display: "inline-block"}}>SHORT</p>)}: <h4 style={{display: "inline-block"}}><b>{props.numShares}</b></h4> for <h4 style={{display: "inline-block"}}><b>${props.totalPrice}</b></h4></strong></p>
            <p><strong>{props.isLong ? "Sell stop" : "Buy stop"} ${props.stopPrice}</strong></p>
            
        </div>

    let notAfford = 
        <div>
            <h3 style={{backgroundColor: "#fd7d7d"}}>Out of Price Range! ${props.totalPrice}</h3>
        </div>

    return (
        

        <div>
            {props.canAfford ? afford : notAfford} 
            {props.canAfford && prevTrade}
            
        </div>
    )
}


const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, null)(ShareResult)