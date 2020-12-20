import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-drug-dosage-form`;

export function getDrugDosageFormAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function addDrugDosageFormAPI(name) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name: name });
}

export function updateDrugDosageFormAPI(id, name) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name: name
  })
}

export function deleteDrugDosageFormAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}