import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../../actions/taskActions';
import PropTypes from 'prop-types';
import EditTaskModal from './EditTaskModal';
import ShareTaskModal from './ShareTaskModal';
import ConfirmShareTaskModal from './ConfirmShareTaskModal';

class TaskList extends Component {
    static propTypes = {
        getTasks: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        userId: PropTypes.string
    };

    componentDidMount() {
        this.props.getTasks(localStorage.checkID);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId
            || prevProps.shareId !== this.props.shareId) {
            this.props.getTasks(localStorage.checkID);
        }
    }

    onDeleteCick = (id) => {
        this.props.deleteTask(id);
    };

    render() {
        const { tasks } = this.props.task;
        return (
            <Container>
                {/* {this.props.isAuthenticated ? */}
                    <ListGroup>
                        <TransitionGroup className='task-list'>
                            {tasks.map(({ _id, name }) => (
                                <CSSTransition key={_id} timeout={500} classNames='fade'>
                                    <ListGroupItem>{name}
                                        <Button
                                            className='remove-btn'
                                            color='danger'
                                            size='sm'
                                            onClick={this.onDeleteCick.bind(this, _id)}
                                        >&times; Delete Task
                                        </Button>
                                        <ShareTaskModal id={_id} />
                                        <EditTaskModal id={_id} />
                                        <ConfirmShareTaskModal />
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup> 
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    task: state.task,
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    shareId: state.auth.shareId,
    shareClick: state.task.shareClick
});

export default connect(mapStateToProps, { getTasks, deleteTask })(TaskList);