import React from 'react'

const ShareResult = (props) => {

    let afford = 
        <div>
            <p><strong>Number of shares going {props.isLong ? "LONG" : "SHORT"}: {props.numShares} for ${props.totalPrice}</strong></p>
            <p><strong>{props.isLong ? "Sell stop" : "Buy stop"} {props.stopPrice}</strong></p>
            <p><strong>{props.isLong ? "Sell limit" : "Buy limit"} {props.target}</strong></p>
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