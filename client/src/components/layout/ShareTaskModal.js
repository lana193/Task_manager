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
import { updateTask, getSharedId, shareClicked } from '../../actions/taskActions';
import ConfirmModal from './ConfirmModal';

class ShareTaskModal extends Component {
    state = {
        email: '',
        modal: false
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({email: e.target.value});
    };

    onShare = e => {
        e.preventDefault();
        this.props.getSharedId(this.state.email);
        //this.props.shareClicked();
        //this.props.shareClick = true;

        this.toggle();
    };

    render () {
        return(
            <React.Fragment>
               <Button
                    className='share-btn'
                    color='warning'
                    size='sm'
                    onClick={ this.toggle }>Share Task
                </Button> 
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Share Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='task'>Task</Label>
                                <Input
                                type='email'
                                name='email'
                                id='task'
                                placeholder='Email to share'
                                value={this.state.email}
                                onChange={this.onChange}
                                />
                                <Button
                                color='warning'
                                style={{marginTop: '2rem'}}
                                onClick={this.onShare}
                                block>
                                    Share Task
                                </Button>
                                <ConfirmModal id={this.props.id} />
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { updateTask, getSharedId, shareClicked })(ShareTaskModal);