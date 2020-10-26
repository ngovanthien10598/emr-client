import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-disease-category`;

export function getDiseaseCategoryAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function addDiseaseCategoryAPI(name) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name: name });
}

export function updateDiseaseCategoryAPI(id, name) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name: name
  })
}

export function deleteDiseaseCategoryAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}