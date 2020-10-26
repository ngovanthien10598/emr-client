import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/admin/manage-disease`;

export function getDiseasesAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function getDiseaseDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}

export function addDiseaseAPI({ code, name, disease_category }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    code,
    name,
    disease_category
  });
}

export function updateDiseaseAPI(id, { code, name, disease_category }) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    code,
    name,
    disease_category
  });
}

export function deleteDiseaseAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}