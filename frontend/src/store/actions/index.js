import { LOGIN_STUDENT, LOGIN_FACULTY } from '../actionTypes';

export const loginStudent = studentId => async dispatch => {
  dispatch({
    type: LOGIN_STUDENT,
    studentId,
  });
};

export const loginFaculty = ssn => async dispatch => {
  dispatch({
    type: LOGIN_FACULTY,
    ssn,
  });
};
