import { LOGIN } from '../actionTypes';

export const login = ({ userType, id }) => async dispatch => {
  dispatch({
    type: LOGIN,
    userType,
    id,
  });
};
