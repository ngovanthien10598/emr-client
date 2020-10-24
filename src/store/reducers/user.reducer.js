import * as actionTypes from '../actionTypes';

const initialState = {
  user: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null
      }
    default:
      return { ...state }
  }
}