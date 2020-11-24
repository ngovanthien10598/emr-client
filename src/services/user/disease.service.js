import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/user/disease`;

export function getDiseasesAPI(categoryId) {
  const url = `${endpointPrefix}/`;
  if (categoryId) {
    return axios.get(`${url}?disease_category=${categoryId}`);
  }
  return axios.get(url);
}

export function getDiseaseDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}