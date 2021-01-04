import * as actionTypes from '../actionTypes';

const initialState = {
  statistic: null,
  fetchLoading: false
}

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DASHBOARD_PENDING:
      return {
        ...state,
        fetchLoading: true
      }
    case actionTypes.FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        statistic: action.payload
      }
    case actionTypes.FETCH_DASHBOARD_FAILURE:
      return {
        ...state,
        fetchLoading: false
      }
    default:
      return {
        ...state
      }
  }
}