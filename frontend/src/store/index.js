import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  student: null,
  faculty: null,
};

// ACTIONS
const { studentLogIn, facultyLogIn } = createActions('STUDENT_LOG_IN', 'FACULTY_LOG_IN');

// REDUCERS
const reducer = handleActions(
  {
    [studentLogIn]: (state, action) => {
      return { ...state, student: action.student };
    },
    [facultyLogIn]: (state, action) => {
      return { ...state, faculty: action.faculty };
    },
  },
  defaultState
);

// CREATE STORE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
