import React from 'react'

const ShareResult = (props) => {

    let afford = 
        <div>
            <h3>Number of shares going {props.isLong ? "LONG" : "SHORT"}: {props.numShares} for ${props.totalPrice}</h3>
            <h3>{props.isLong ? "Sell stop" : "Buy stop"} {props.stopPrice}</h3>
            <h3>{props.isLong ? "Sell limit" : "Buy limit"} {props.target}</h3>
        </div>

    let notAfford = 
        <div>
            <h3 style={{backgroundColor: "#fd7d7d"}}>Out of Price Range! ${props.totalPrice}</h3>
        </div>

    return (
        

        <div>
            {props.canAfford ? afford : notAfford} 
        </div>
    )
}

export default ShareResult