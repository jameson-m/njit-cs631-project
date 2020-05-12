import { LOGIN_STUDENT, LOGIN_FACULTY, LOGIN } from '../actionTypes';

const DEFAULT_STATE = {
  user: {
    type: '', // student or faculty
    id: '', // studentId or ssn (faculty)
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          type: action.userType,
          id: action.id,
        },
      };
    default:
      return state;
  }
};
