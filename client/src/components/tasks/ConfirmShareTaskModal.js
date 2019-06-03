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


class ConfirmShareTaskModal extends Component {
    state = {
        email: '',
        taskName: '',
        modal: false
    };

    getTaskName = (id, taskArray = []) => {
        return taskArray.find(task => task._id === id);
    }

    onSubmit = () => {
        this.props.shareClicked();
    }

    toggle = () => {
        this.props.shareClicked();
    }

    onShareConfirm = () => {
        const taskName = this.props.task.tasks.filter(task => task._id === this.props.curTaskId);
        const updatedTask = {
            shareid: this.props.shareId,
            name: taskName[0].name
        }
        this.props.updateTask(this.props.curTaskId, updatedTask, this.props.userId);
        this.toggle();
    };

    render() {
        const taskName = this.props.curTaskId ? this.getTaskName(this.props.curTaskId, this.props.task.tasks).name: ''
        return (
            <React.Fragment>
                <Modal
                    toggle={this.toggle}
                    isOpen={this.props.shareClick}
                >
                    <ModalHeader toggle={this.toggle}>
                        {taskName}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.toggle}>
                            <FormGroup>
                                <Label for='task'>Are you sure you want share this task with another user?</Label>
                                <Button
                                    color='primary'
                                    style={{ marginTop: '2rem' }}
                                    onClick={this.onShareConfirm}
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
    shareId: state.task.shareId,
    shareClick: state.task.shareClick,
    userId: state.auth.userId,
    curTaskId: state.task.curTaskId
});

export default connect(mapStateToProps, { updateTask, shareClicked })(ConfirmShareTaskModal);