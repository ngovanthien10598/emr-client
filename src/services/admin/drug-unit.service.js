import axios from 'axios';

const { API_URL } = require("constant/apiUrl");

const endpointPrefix = `${API_URL}/admin/manage-drug-unit`;

export function getDrugUnitsAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function addDrugUnitAPI(name) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name: name });
}

export function updateDrugUnitAPI(id, name) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name: name
  })
}

export function deleteDrugUnitAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}