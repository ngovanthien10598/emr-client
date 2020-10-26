import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-drug-category`;

export function getDrugCategoryAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function addDrugCategoryAPI(name) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name: name });
}

export function updateDrugCategoryAPI(id, name) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name: name
  })
}

export function deleteDrugCategoryAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}