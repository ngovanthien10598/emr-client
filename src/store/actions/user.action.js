import * as actionTypes from '../actionTypes';
import Cookie from 'js-cookie'

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user
  }
}

export function logout() {
  Cookie.remove('EMR_access');
  Cookie.remove('EMR_refresh');
  return {
    type: actionTypes.REMOVE_USER
  }
}