import React from 'react'

const PortfolioValue = (props) => {

    let styles = {}
    if(props.numDayTrades >= 3){
        styles = {
            color: "red"
        }
    }
    else{
        styles = {
            color: "green"
        }
    }
    return (
        <div className="portfolioValue">

            <p><strong>Portfolio Value:</strong> ${props.portfolio.toFixed(2)}</p>           
            <label><strong>Risk Percentage</strong></label>
            <input className="riskValue input" value={props.riskPercent} placeholder={props.riskPercent} name="riskPercent" onChange={props.handleChange} size="1" /> 
            <p className="inline_p" >% (${props.riskDollarValue.toFixed(2)})</p>
            {props.portfolio < 25000 && (<p>Number of day trades in the past 5 trading days: <strong style={styles}>{props.numDayTrades}</strong></p>)}
        </div>
    )
}

export default PortfolioValue 