import { ADMIN_DASHBOARD_URL } from 'constant/apiUrl';
import * as actionTypes from '../actionTypes';
import axios from 'axios';

function fetchDashboardPending() {
  return {
    type: actionTypes.FETCH_DASHBOARD_PENDING
  }
}

function fetchDashboardSuccess(data) {
  return {
    type: actionTypes.FETCH_DASHBOARD_SUCCESS,
    payload: data
  }
}

function fetchDashboardFailure() {
  return {
    type: actionTypes.FETCH_DASHBOARD_FAILURE
  }
}

export function fetchDashboard() {
  
  const endpoint = ADMIN_DASHBOARD_URL;

  return async dispatch => {
    try {
      dispatch(fetchDashboardPending());
      const response = await axios.get(endpoint);
      return dispatch(fetchDashboardSuccess(response.data));
    } catch (error) {
      return dispatch(fetchDashboardFailure());
    }
  }
}