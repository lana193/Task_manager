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

import { connect } from 'react-redux';
import { updateTask } from '../../actions/taskActions';

class EditTaskModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({name: e.target.value});
    };

    onEditCick = () => {
        const updatedTask = {
            name: this.state.name,
            shareid: this.props.shareId
        }
        this.props.updateTask(this.props.id, updatedTask, this.props.userId);
        this.toggle();
    };

    render () {
        return(
            <React.Fragment>
               <Button
                    className='update-btn'
                    color='primary'
                    size='sm'
                    onClick={ this.toggle }>Edit Task
                </Button> 
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Edit Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='task'>Task</Label>
                                <Input
                                type='text'
                                name='name'
                                id='task'
                                placeholder='Edit Task'
                                value={this.state.name}
                                onChange={this.onChange}
                                />
                                <Button
                                color='dark'
                                style={{marginTop: '2rem'}}
                                onClick={()=>this.onEditCick()}
                                block>
                                    Edit Task
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    task: state.task,
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    shareId: state.task.shareId
});

export default connect(mapStateToProps, { updateTask })(EditTaskModal);