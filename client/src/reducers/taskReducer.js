import { 
    GET_TASKS, 
    ADD_TASK, 
    DELETE_TASK, 
    TASKS_LOADING, 
    UPDATE_TASK, 
    GET_SHARED_ID, 
    ON_SHARE_CLICK
} from '../actions/types';

const initialState = {
    tasks: [],
    loading: false,
    shareID: '',
    shareClick: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false//,
                // isOpenTaskModal: false
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: true
            };
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_SHARED_ID:
            return {
                ...state,
                shareID: action.payload,
                loading: false
            };
        case ON_SHARE_CLICK:
            return {
                ...state,
                shareClick: !state.shareClick
            }
        default:
            return state;
    }
}