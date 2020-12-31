import * as actionTypes from '../actionTypes';

const initialState = {
  diseaseCategories: [],
  createLoading: false,
  fetchLoading: false,
  detailsLoading: false,
  updateLoading: false,
  deleteLoading: false
}

export default function diseaseCategoryReducer(state = initialState, action) {
  switch (action.type) {
    // fetch all
    case actionTypes.FETCH_DISEASE_CATEGORIES_PENDING:
      return {
        ...state,
        fetchLoading: true
      }
    case actionTypes.FETCH_DISEASE_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        diseaseCategories: action.payload
      }
    case actionTypes.FETCH_DISEASE_CATEGORIES_FAILURE:
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