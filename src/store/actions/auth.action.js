import * as actionTypes from '../actionTypes';
import { login } from 'services/auth/auth.service';
import Cookie from 'js-cookie';
import { getProfileAction, removeUserAction } from './user.action';

function loginPending() {
  return {
    type: actionTypes.LOGIN_PENDING
  }
}

function loginSuccess() {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  }
}

function loginFailure() {
  return {
    type: actionTypes.LOGIN_FAILURE
  }
}

export function loginAction(email, password) {
  return async dispatch => {
    try {
      dispatch(loginPending());
      const loginRes = await login(email, password);
      const loginData = loginRes.data;

      const accessToken = loginData.access_token;
      const refreshToken = loginData.refresh_token;
      Cookie.set('EMR_token', accessToken, { expires: 3 / 24 }); // 3 hours
      Cookie.set('EMR_refresh', refreshToken, { expires: 7 }); // 7 days
      dispatch(loginSuccess());
      dispatch(getProfileAction());
    } catch (error) {
      dispatch(loginFailure());
    }
  }
}

export function logoutAction() {
  Cookie.remove('EMR_token');
  Cookie.remove('EMR_refresh');

  return dispatch => {
    dispatch(removeUserAction());
  }
}