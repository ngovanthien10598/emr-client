import * as actionTypes from '../actionTypes';
import axios from 'axios';
import {
  ADMIN_DISEASE_CATEGORY_URL,
  USER_DISEASE_CATEGORY_URL,
} from 'constant/apiUrl';
import { getQueryString } from 'utils/string';




function fetchDiseaseCategoryPending() {
  return {
    type: actionTypes.FETCH_DISEASE_CATEGORIES_PENDING
  }
}

function fetchDiseaseCategorySuccess(data) {
  return {
    type: actionTypes.FETCH_DISEASE_CATEGORIES_SUCCESS,
    payload: data
  }
}

function fetchDiseaseCategoryFailure() {
  return {
    type: actionTypes.FETCH_DISEASE_CATEGORIES_FAILURE
  }
}









export function createDiseaseCategory() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function fetchDiseaseCategory(role, query) {
  let endpoint = "";
  if (role === "admin") {
    endpoint = ADMIN_DISEASE_CATEGORY_URL + "/";
  } else {
    endpoint = USER_DISEASE_CATEGORY_URL + "/";
  }

  if (query) {
    endpoint += getQueryString(query);
  }

  return async dispatch => {
    try {
      dispatch(fetchDiseaseCategoryPending());
      const response = await axios.get(endpoint);
      return dispatch(fetchDiseaseCategorySuccess(response.data));
    } catch (error) {
      return dispatch(fetchDiseaseCategoryFailure());
    }
  }
}
export function fetchDiseaseCategoryDetails() {
  
  return async dispatch => {
    try {
      return dispatch()

      dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function updateDiseaseCategory() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function deleteDiseaseCategory() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}