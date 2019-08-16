import React from 'react'

const Calculator = (props) => {
    return (
        <div className="calculatorForm">
            <form onSubmit={props.handleSubmit}>
                    <label className="calculator_label">
                        <strong>Ticker:</strong>
                        <input required className="input calculator_input" type="text" value={props.ticker} name="ticker" onChange={props.handleChange} /> 
                        
                    </label>
                    <label className="calculator_label">
                        <strong>Buy Price:</strong>
                        <input required className="input calculator_input" type="text" value={props.buyPrice} name="buyPrice" onChange={props.handleChange} /> 
               
                    </label>
                    <label className="calculator_label">
                        <strong>Stop Price:</strong>
                        <input required className="input calculator_input" type="text" value={props.stopPrice} name="stopPrice" onChange={props.handleChange} /> 
                    
                    </label>
                    <br /> 
                    <button type='submit' onClick={props.calculate}>Calculate</button>
            </form>

                <button type='submit' onClick={props.resetCaculator}>Reset</button>
        </div>
    )
}

export default Calculator