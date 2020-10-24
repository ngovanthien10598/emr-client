import * as actionTypes from '../actionTypes';

const initialState = {
  loginLoading: false
}

export default function authReducer (state = initialState, action) {
  switch(action.type) {
    case actionTypes.LOGIN_PENDING:
      return {
        ...state,
        loginLoading: true
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false
      }

    default:
      return {
        ...state
      }
  }
}