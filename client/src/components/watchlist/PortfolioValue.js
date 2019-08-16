import React from 'react'

const PortfolioValue = (props) => {
    return (
        <div className="portfolioValue">

            <p><strong>Portfolio Value:</strong> ${props.portfolio.toFixed(2)}</p>           
            <label><strong>Risk Percentage</strong></label>
            <input className="riskValue input" value={props.riskPercent} placeholder={props.riskPercent} name="riskPercent" onChange={props.handleChange} size="1" /> 
            <p className="inline_p" >% (${props.riskDollarValue.toFixed(2)})</p>
        </div>
    )
}

export default PortfolioValue 