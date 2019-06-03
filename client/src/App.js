import React, { Component } from 'react';
import AppNavbar from './components/nav/AppNavbar';
import TaskList from './components/tasks/TaskList';
import AddTaskModal from './components/tasks/AddTaskModal';
import { Container } from 'reactstrap';

import { Provider } from "react-redux";
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
      store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <AddTaskModal />
            <TaskList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
