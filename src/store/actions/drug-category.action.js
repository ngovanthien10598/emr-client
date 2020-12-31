import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { ADMIN_DRUG_CATEGORY_URL, USER_DRUG_CATEGORY_URL } from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

// Create drug category
function createDrugCategoryPending() {
  return {
    type: actionTypes.CREATE_DRUG_CATEGORY_PENDING
  }
}

function createDrugCategorySuccess() {
  return {
    type: actionTypes.CREATE_DRUG_CATEGORY_SUCCESS,
  }
}

function createDrugCategoryFailure() {
  return {
    type: actionTypes.CREATE_DRUG_CATEGORY_FAILURE
  }
}

// Fetch drug categories
function fetchDrugCategoriesPending() {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORIES_PENDING
  }
}

function fetchDrugCategoriesSuccess(data) {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORIES_SUCCESS,
    payload: data
  }
}

function fetchDrugCategoriesFailure() {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORIES_FAILURE
  }
}

// Fetch drug category details
function fetchDrugCategoryDetailsPending() {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORY_DETAILS_PENDING
  }
}

function fetchDrugCategoryDetailsSuccess(data) {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORY_DETAILS_SUCCESS,
    payload: data
  }
}

function fetchDrugCategoryDetailsFailure() {
  return {
    type: actionTypes.FETCH_DRUG_CATEGORY_DETAILS_FAILURE
  }
}

// Update drug category
function updateDrugCategoryPending() {
  return {
    type: actionTypes.UPDATE_DRUG_CATEGORY_PENDING
  }
}

function updateDrugCategorySuccess() {
  return {
    type: actionTypes.UPDATE_DRUG_CATEGORY_SUCCESS
  }
}

function updateDrugCategoryFailure() {
  return {
    type: actionTypes.UPDATE_DRUG_CATEGORY_FAILURE
  }
}

// Delete drug category
function deleteDrugCategoryPending() {
  return {
    type: actionTypes.DELETE_DRUG_CATEGORY_PENDING
  }
}

function deleteDrugCategorySuccess() {
  return {
    type: actionTypes.DELETE_DRUG_CATEGORY_SUCCESS
  }
}

function deleteDrugCategoryFailure() {
  return {
    type: actionTypes.DELETE_DRUG_CATEGORY_FAILURE
  }
}


/**
 * -----------------------------------------------------
 * Exported functions
 * -----------------------------------------------------
 */
export function createDrugCategory(body) {
  let endpoint = ADMIN_DRUG_CATEGORY_URL + '/';

  return async dispatch => {
    try {
      dispatch(createDrugCategoryPending());
      await axios.post(endpoint, body);
      dispatch(createDrugCategorySuccess());
    } catch(error) {
      dispatch(createDrugCategoryFailure());
    }
  }
}


export function fetchDrugCategories(role, query) {
  let endpoint;
  if (role === "admin") {
    endpoint = ADMIN_DRUG_CATEGORY_URL + '/';
  } else {
    endpoint = USER_DRUG_CATEGORY_URL + '/';
  }

  if (query) {
    endpoint += getQueryString(query);
  }

  return async dispatch => {
    try {
      dispatch(fetchDrugCategoriesPending());
      const response = await axios.get(endpoint);
      dispatch(fetchDrugCategoriesSuccess(response.data));
    } catch(error) {
      dispatch(fetchDrugCategoriesFailure());
    }
  }
}

export function fetchDrugCategoryDetails(role, id, query) {
  let endpoint;
  if (role === "admin") {
    endpoint = ADMIN_DRUG_CATEGORY_URL + `/${id}/`;
  } else {
    endpoint = USER_DRUG_CATEGORY_URL + `/${id}/`;
  }

  if (query) {
    endpoint += getQueryString(query);
  }

  return async dispatch => {
    try {
      dispatch(fetchDrugCategoryDetailsPending());
      const response = await axios.get(endpoint);
      dispatch(fetchDrugCategoryDetailsSuccess(response.data));
    } catch(error) {
      dispatch(fetchDrugCategoryDetailsFailure());
    }
  }
}

export function updateDrugCategory(id, body) {
  let endpoint = ADMIN_DRUG_CATEGORY_URL + `/${id}/`;
  return async dispatch => {
    try {
      dispatch(updateDrugCategoryPending());
      await axios.put(endpoint, body);
      dispatch(updateDrugCategorySuccess());
    } catch {
      dispatch(updateDrugCategoryFailure());
    }
  }
}

export function deleteDrugCategory(id) {
  let endpoint = ADMIN_DRUG_CATEGORY_URL + `/${id}/`;
  return async dispatch => {
    try {
      dispatch(deleteDrugCategoryPending());
      await axios.delete(endpoint);
      return dispatch(deleteDrugCategorySuccess());
    } catch {
      return dispatch(deleteDrugCategoryFailure());
    }
  }
}