import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-drug-route`;

export function getDrugRouteAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function addDrugRouteAPI(name) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name: name });
}

export function updateDrugRouteAPI(id, name) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name: name
  })
}

export function deleteDrugRouteAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}