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

    componentDidMount(){
        const taskName = this.props.task.tasks.filter(task => task._id === this.props.id);
        this.setState({ taskName: taskName[0].name });
    }

    onSubmit = () => {
        this.props.shareClicked();
    }

    toggle = () => {
        this.props.shareClicked();
        this.setState({
            modal: !this.state.modal
        });
    }

    onShareConfirm = () => {
        const taskName = this.props.task.tasks.filter(task => task._id === this.props.id);
        // this.setState({ taskName: taskName[0].name });
        const updatedTask = {
            shareid: this.props.shareID,
            name: taskName[0].name
        }
        this.props.updateTask(this.props.id, updatedTask, this.props.userID);
        this.toggle();
    };

    render() {
        console.log(444, this.state.taskName)
        return (
            <React.Fragment>
                <Modal
                    toggle={this.toggle}
                    isOpen={this.props.shareClicked}
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
                                    // onClick={() => this.onShareConfirm()}
                                    onClick={this.onShareClick}
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
    userID: state.auth.userID
});

export default connect(mapStateToProps, { updateTask, shareClicked })(ConfirmModal);