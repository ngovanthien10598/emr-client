import axios from 'axios';
import { API_URL } from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

const endpointPrefix = `${API_URL}/user/drug`;

export function getDrugsAPI(params) {
  const url = `${endpointPrefix}/`;

  if (params) {
    return axios.get(`${url}?${getQueryString(params)}`);
  }
  return axios.get(url);
}

export function getDrugDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}