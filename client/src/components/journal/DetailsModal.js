import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import UpdateTrade from './updateModal'



class DetailsModal extends Component{
    state = {
        modal: false,
        name: '',
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        const name = e.target.name
       
    }



    onSubmit = e => {
        e.preventDefault();

        this.toggle();
    }

    render(){

        const positivePL = (<span>${this.props.pL.toFixed(2)}</span>)
        const negativePL = (<span>-${Math.abs(this.props.pL).toFixed(2)}</span>)





        return (
            <React.Fragment>

                <Button
                    className="view-btn"
                    onClick={this.toggle}>
                   <i>VIEW</i></Button> 
                
               

               <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="detailsModal">
                    
                    

                    <ModalHeader toggle={this.toggle}>{this.props.ticker} - Trade Details</ModalHeader>
                    <ModalBody>
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Entry Date:</i> <strong>{this.props.entryDate}</strong></p>
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Exit Date:</i> <strong>{this.props.exitDate}</strong></p>
                        <br />
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Entry Price:</i> <strong>${this.props.entry}</strong></p>
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Exit Price:</i> <strong>${this.props.exit}</strong></p>
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Shares:</i> <strong>{this.props.numShares}</strong></p>
                        <p><i style={{color: "rgba(38, 43, 62, 0.8)"}}>Result</i> - <strong>{this.props.winLose} for {this.props.pL > 0 ? positivePL : negativePL}</strong></p>
                        <h5>Strategy/Thoughts</h5>
                        <div className="noteText">
                            <p>{this.props.note}</p>
                         </div>
                       
                        <img src={`${this.props.tradeIMG}`}/> 
                    
                        <Link to={`/update/${this.props._id}`} component={UpdateTrade} ><Button>Edit Trade</Button></Link>
                    </ModalBody>
               </Modal> 
               
            </React.Fragment>
        )
    }
}



export default DetailsModal