import * as actionTypes from '../actionTypes';

const initialState = {
  diseases: null,
  createLoading: false,
  fetchLoading: false,
  detailsLoading: false,
  updateLoading: false,
  deleteLoading: false
}

export default function diseaseReducer(state = initialState, action) {
  switch (action.type) {
    // fetch all
    case actionTypes.FETCH_DISEASES_PENDING:
      return {
        ...state,
        fetchLoading: true
      }
    case actionTypes.FETCH_DISEASES_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        diseases: action.payload
      }
    case actionTypes.FETCH_DISEASES_FAILURE:
      return {
        ...state,
        fetchLoading: false,
      }
    // Default
    default:
      return {
        ...state
      }
  }
}