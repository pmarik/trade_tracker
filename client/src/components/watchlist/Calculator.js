import React from 'react'
import {Button} from 'reactstrap'

const Calculator = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className="calculatorForm">
                <div className="calcItem">
                    <label className="calculator_label">
                        <strong>Ticker:</strong></label>
                        <input required className="input calculator_input" type="text" value={props.ticker} name="ticker" onChange={props.handleChange} /> 
                </div>    

                <div className="calcItem">
                    <label className="calculator_label">
                        <strong>Buy Price:</strong></label>
                        <input required className="input calculator_input" type="text" value={props.buyPrice} name="buyPrice" onChange={props.handleChange} /> 
               </div>

                <div className="calcItem">  
                    <label className="calculator_label">
                         <strong>Stop Price:</strong> </label>
                        <input required className="input calculator_input" type="text" value={props.stopPrice} name="stopPrice" onChange={props.handleChange} /> 
                </div>
                   
                    <br /> 
                    <Button type='submit' className="calc-btn" onClick={props.calculate}>Calculate</Button>
            </form>

                <Button type='submit' className="reset-btn" onClick={props.resetCaculator}>Reset</Button>
        </div>
    )
}

export default Calculator