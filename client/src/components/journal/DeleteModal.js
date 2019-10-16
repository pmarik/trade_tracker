import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    
} from 'reactstrap';



class DeleteModal extends Component{
    state = {
        modal: false,
       
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

  



    render(){


        return (
            <div>

                <Button
                    onClick={this.toggle}
                    className="remove-btn"
                    color="danger" 
                    size="sm">
                   &times;</Button> 
                
               

               <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                   >
                    
                    

                    <ModalHeader toggle={this.toggle}>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <p style={{display: "block"}}><strong>Are you sure you want to delete trade {this.props.ticker}?</strong></p>
                        <Button
                            style={{marginRight: "25px", width: "68px"}}
                            color="dark"
                            onClick={this.props.delete}>
                            Yes
                        </Button>
                        <Button
                            onClick={this.toggle}>
                            Cancel
                        </Button>

                    </ModalBody>
               </Modal> 
               
            </div>
        )
    }
}



export default DeleteModal