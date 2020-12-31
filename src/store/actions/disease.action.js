import * as actionTypes from '../actionTypes';
import axios from 'axios';
import {
  ADMIN_DISEASE_URL,
  USER_DISEASE_URL,
} from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

function createDiseasePending() {
  return {
    
  }
}

function createDiseaseSuccess() {
  return {
    
  }
}

function createDiseaseFailure() {
  return {
    
  }
}

function fetchDiseasePending() {
  return {
    type: actionTypes.FETCH_DISEASES_PENDING
  }
}

function fetchDiseaseSuccess(data) {
  return {
    type: actionTypes.FETCH_DISEASES_SUCCESS,
    payload: data
  }
}

function fetchDiseaseFailure() {
  return {
    type: actionTypes.FETCH_DISEASES_FAILURE
  }
}

function fetchDiseaseDetailsPending() {
  return {
    
  }
}

function fetchDiseaseDetailsSuccess(data) {
  return {
    
  }
}

function fetchDiseaseDetailsFailure() {
  return {
    
  }
}

function updateDiseasePending() {
  return {
    
  }
}
function updateDiseaseSuccess() {
  return {
    
  }
}
function updateDiseaseFailure() {
  return {
    
  }
}
function deleteDiseasePending() {
  return {
    
  }
}

function deleteDiseaseSuccess() {
  return {
    
 }
}

function deleteDiseaseFailure() {
  return {
   
  }
}



export function createDisease() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function fetchDisease(role, query) {
  let endpoint = "";
  if (role === "admin") {
    endpoint = ADMIN_DISEASE_URL + "/";
  } else {
    endpoint = USER_DISEASE_URL + "/";
  }

  if (query) {
    endpoint += getQueryString(query);
  }

  return async dispatch => {
    try {
      dispatch(fetchDiseasePending());
      const response = await axios.get(endpoint);
      return dispatch(fetchDiseaseSuccess(response.data));
    } catch (error) {
      return dispatch(fetchDiseaseFailure());
    }
  }
}
export function fetchDiseaseDetails() {
  
  return async dispatch => {
    try {
      return dispatch()

      dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function updateDisease() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}
export function deleteDisease() {
  
  return async dispatch => {
    try {
      dispatch()

      return dispatch()
    } catch (error) {
      return dispatch()
    }
  }
}