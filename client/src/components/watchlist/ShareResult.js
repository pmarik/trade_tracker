import React from 'react'
import DetailsModal from '../journal/DetailsModal'
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

function reverseDate(date){
    let yr = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        return `${month}-${day}-${yr}`;
}

function datediff(first, second){
    return Math.round((second-first)/(1000*60*60*24));
}

const ShareResult = (props) => {

    const { items } = props.item;
    let prevTrade = '';
    if(items.length > 0 ){
             //get dates of previous trades
             let matchTicker = items.filter(trade => {
                 if(trade.ticker.toLowerCase() === props.ticker.toLowerCase()){
                     return true
                 }
             })
            if(matchTicker.length > 0){

                    const today = new Date();

                
                    //let lasttraded = datediff(parseDate(findPrevTrade[findPrevTrade.length - 1].exitDate), today)
                    let lastTraded = datediff(parseDate(matchTicker[matchTicker.length - 1].exitDate), today)
                  
                    const viewLastTrade = matchTicker[matchTicker.length - 1];

                    prevTrade = (<p>You last traded this stock {lastTraded - 1} day{lastTraded - 1 != 1 && "s"} ago <DetailsModal 
                                                    _id={viewLastTrade._id}
                                                    entryDate={reverseDate(viewLastTrade.entryDate.substring(0,10))}
                                                    exitDate={reverseDate(viewLastTrade.exitDate.substring(0,10))}
                                                    ticker={viewLastTrade.ticker} 
                                                    numShares={viewLastTrade.numShares}
                                                    note={viewLastTrade.note} 
                                                    entry={viewLastTrade.entry} 
                                                    exit={viewLastTrade.exit} 
                                                    stopPrice={viewLastTrade.stopPrice}
                                                    winLose={viewLastTrade.winLose} 
                                                    pL={viewLastTrade.pL} 
                                                    tradeIMG={viewLastTrade.tradeIMG}
                                /></p>  )
                
               
               
            }
            else{
                prevTrade = (<p>You have not traded this ticker before</p>)
            }
    }

    let afford = 
        <div>
            <p><strong>Number of shares going {props.isLong ? (<p style={{color: "green", display: "inline-block", marginBottom: "0px"}}>LONG</p>) : (<p style={{color: "red", display: "inline-block", marginBottom: "0px"}}>SHORT</p>)}: <h4 style={{display: "inline-block", marginBottom: "0px"}}><b>{props.numShares}</b></h4> for <h4 style={{display: "inline-block", marginBottom: "0px"}}><b>${props.totalPrice.toFixed(2)}</b></h4></strong></p>
            <p><strong>{props.isLong ? "Sell stop" : "Buy stop"} ${props.stopPrice}</strong></p>
            
        </div>

    let notAfford = 
        <div>
            <h3 style={{backgroundColor: "#fd7d7d"}}>Out of Price Range! ${props.totalPrice.toFixed(2)}</h3>
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