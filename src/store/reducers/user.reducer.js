import * as actionTypes from '../actionTypes';

const initialState = {
  user: null,
  getProfileLoading: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_PENDING:
      return {
        ...state,
        user: null,
        getProfileLoading: true
      }
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        getProfileLoading: false
      }
    case actionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        user: null,
        getProfileLoading: false
      }
    
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        getProfileLoading: false
      }
    default:
      return { ...state }
  }
}