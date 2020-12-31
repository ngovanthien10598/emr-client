import * as actionTypes from '../actionTypes';

const initialState = {
  drugCategories: null,
  drugCategoryDetails: null,
  createLoading: false,
  fetchLoading: false,
  detailsLoading: false,
  updateLoading: false,
  deleteLoading: false
}

export default function drugCategoryReducer(state = initialState, action) {
  switch (action.type) {
    // Create drug category
    case actionTypes.CREATE_DRUG_CATEGORY_PENDING:
      return {
        ...state,
        createLoading: true
      }
    case actionTypes.CREATE_DRUG_CATEGORY_SUCCESS:
    case actionTypes.CREATE_DRUG_CATEGORY_FAILURE:
      return {
        ...state,
        createLoading: false
      }
    // Drug categories
    case actionTypes.FETCH_DRUG_CATEGORIES_PENDING:
      return {
        ...state,
        fetchLoading: true,
      }
    case actionTypes.FETCH_DRUG_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        drugCategories: action.payload
      }
    case actionTypes.FETCH_DRUG_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchLoading: false,
      }

    // Drug category details
    case actionTypes.FETCH_DRUG_CATEGORY_DETAILS_PENDING:
      return {
        ...state,
        detailsLoading: true,
      }
    case actionTypes.FETCH_DRUG_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        drugCategoryDetails: action.payload,
        detailsLoading: false,
      }
    case actionTypes.FETCH_DRUG_CATEGORY_DETAILS_FAILURE:
      return {
        ...state,
        detailsLoading: false,
      }
    // Update drug category
    case actionTypes.UPDATE_DRUG_CATEGORY_PENDING:
      return {
        ...state,
        updateLoading: true
      }
    case actionTypes.UPDATE_DRUG_CATEGORY_SUCCESS:
    case actionTypes.UPDATE_DRUG_CATEGORY_FAILURE:
      return {
        ...state,
        updateLoading: false
      }
    // Delete drug category
    case actionTypes.DELETE_DRUG_CATEGORY_PENDING:
      return {
        ...state,
        deleteLoading: true
      }
    case actionTypes.DELETE_DRUG_CATEGORY_SUCCESS:
    case actionTypes.DELETE_DRUG_CATEGORY_FAILURE:
      return {
        ...state,
        deleteLoading: false
      }
    default:
      return {
        ...state
      }
  }
}