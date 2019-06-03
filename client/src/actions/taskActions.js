import axios from 'axios';
import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    TASKS_LOADING,
    GET_SHARED_ID,
    ON_SHARE_CLICK
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTasks = (checkID) => dispatch => {
    dispatch(setTasksLoading());
    axios
        .get(`/api/tasks/${checkID}`)
        .then(res =>
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
        .then(() => {
            return axios.get(`/api/tasks/${checkID}`)
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addTask = task => (dispatch, getState) => {
    axios
        .post('/api/tasks', task, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateTask = (id, task, userID) => (dispatch, getState) => {
    axios
        .put(`/api/tasks/${id}`, task, tokenConfig(getState))
        .then(() => {
            return axios.get(`/api/tasks/${userID}`)
        })
        .then(res => {
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        }
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteTask = id => (dispatch, getState) => {
    axios
        .delete(`/api/tasks/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setTasksLoading = () => {
    return {
        type: TASKS_LOADING
    };
};

export const getSharedId = (email, id) => dispatch => {
    axios
        .get(`/api/users/${email}`)
        .then(res =>
            dispatch({
                type: GET_SHARED_ID,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const shareClicked = (id) => {
    return {
        type: ON_SHARE_CLICK,
        id
    }
}