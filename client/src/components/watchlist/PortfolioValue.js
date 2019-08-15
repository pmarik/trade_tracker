import React from 'react'

const PortfolioValue = (props) => {
    return (
        <div>

            <p>Portfolio Value: ${props.portfolio.toFixed(2)}</p>
            {/* <label>Portfolio Value $</label> */}
           {/* <input className="portfolioValue input" value={props.portfolio} placeholder={props.portfolio} name="portfolio" onChange={props.handleChange} size="4"/>  */}
           
            <label>Risk Percentage</label>
            <input className="riskValue input" value={props.riskPercent} placeholder={props.riskPercent} name="riskPercent" onChange={props.handleChange} size="1" /> 
            <p className="inline_p" >% (${props.riskDollarValue.toFixed(2)})</p>
        </div>
    )
}

export default PortfolioValue 