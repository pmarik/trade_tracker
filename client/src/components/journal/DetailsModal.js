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
import UpdateModal from './updateModal'



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
            <div>

                <Button
                    className="view-btn"
                    onClick={this.toggle}>
                   <strong>VIEW</strong></Button> 
                
               

               <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="detailsModal">
                    
                    

                    <ModalHeader toggle={this.toggle}>{this.props.ticker} - Trade Details</ModalHeader>
                    <ModalBody>
                        <p><strong>Entry Date:</strong> {this.props.entryDate}</p>
                        <p><strong>Exit Date:</strong> {this.props.exitDate}</p>
                        <br />
                        <p><strong>Entry Price:</strong> ${this.props.entry}</p>
                        <p><strong>Exit Price:</strong> ${this.props.exit}</p>
                        <p><strong>Shares:</strong> {this.props.numShares}</p>
                        <p><strong>Result</strong> - {this.props.winLose} for {this.props.pL > 0 ? positivePL : negativePL}</p>
                        <h5>Strategy/Thoughts</h5>
                        <div className="noteText">
                            <p>{this.props.note}</p>
                         </div>
                       
                        <img src={`${this.props.tradeIMG}`}/> 
                    
                        <Button                 
                        ><Link to={`/update/${this.props._id}`} component={UpdateModal} id={this.props._id}>Edit Trade</Link></Button>
                    </ModalBody>
               </Modal> 
               
            </div>
        )
    }
}



export default DetailsModal