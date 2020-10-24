import * as actionTypes from '../actionTypes';
import { getProfile } from 'services/user/user.service';

function getProfilePending() {
  return {
    type: actionTypes.GET_PROFILE_PENDING
  }
}

function getProfileSuccess(user) {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    payload: user
  }
}

function getProfileFailure() {
  return {
    type: actionTypes.GET_PROFILE_FAILURE
  }
}

export function getProfileAction() {
  return async dispatch => {
    try {
      dispatch(getProfilePending());
      const profileRes = await getProfile();
      const user = profileRes.data;
      dispatch(getProfileSuccess(user));
    } catch(error) {
      console.log(error);
      dispatch(getProfileFailure());
    }
  }
}

export function removeUserAction() {
  return {
    type: actionTypes.LOGOUT
  }
}