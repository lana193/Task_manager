import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateTask, shareClicked } from '../../actions/taskActions';


class ConfirmModal extends Component {
    state = {
        email: '',
        taskName: '',
        modal: false
    };

    componentDidUpdate(){
        // const taskName = this.props.task.tasks.filter(task => task._id === this.props.id);
        // this.setState({ taskName: taskName[0].name });
    }

    onSubmit = () => {
        this.props.shareClicked();
    }

    toggle = () => {
        this.props.shareClicked();
        // this.setState({
        //     modal: !this.state.modal
        // });
    }

    onShareConfirm = () => {
        console.log(7777, this.props.curTaskId)
        const taskName = this.props.task.tasks.filter(task => task._id === this.props.curTaskId);
        const updatedTask = {
            shareid: this.props.shareID,
            name: taskName[0].name
        }
        this.props.updateTask(this.props.curTaskId, updatedTask, this.props.userID);
        this.toggle();
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    toggle={this.toggle}
                    isOpen={this.props.shareClick}
                    // isOpen={this.state.modal}
                >
                    <ModalHeader toggle={this.toggle}>
                        {this.state.taskName}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.toggle}>
                            <FormGroup>
                                <Label for='task'>Are you sure you want share this task with another user?</Label>
                                <Button
                                    color='primary'
                                    style={{ marginTop: '2rem' }}
                                    onClick={this.onShareConfirm}
                                    // onClick={this.onShareClick}
                                    block>
                                    Confirm
                                </Button>
                                <Button
                                    color='secondary'
                                    style={{ marginTop: '2rem' }}
                                    onClick={this.toggle}
                                    block>
                                    Cancel
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
    shareID: state.task.shareID,
    shareClick: state.task.shareClick,
    userID: state.auth.userID,
    curTaskId: state.task.curTaskId
});

export default connect(mapStateToProps, { updateTask, shareClicked })(ConfirmModal);