import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/admin/manage-drug`;

export function getDrugsAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function getDrugDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}

export function addDrugAPI({ code, name, drug_category, price, drug_unit }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    code,
    name,
    drug_category,
    price: Number(price),
    drug_unit
  });
}

export function updateDrugAPI(id, { code, name, drug_category, price, drug_unit }) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    code,
    name,
    drug_category,
    price: Number(price),
    drug_unit
  });
}

export function deleteDrugAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}