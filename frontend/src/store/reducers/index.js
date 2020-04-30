import { LOGIN_STUDENT, LOGIN_FACULTY } from '../actionTypes';

const DEFAULT_STATE = {
  student: null,
  faculty: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOGIN_STUDENT:
      return {
        ...state,
        student: action.studentId,
      };
    case LOGIN_FACULTY:
      return {
        ...state,
        faculty: action.ssn,
      };
    default:
      return state;
  }
};
