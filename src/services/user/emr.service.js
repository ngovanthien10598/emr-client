import axios from 'axios';
import { NODE_URL } from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

const endpointPrefix = `${NODE_URL}/api`;

export function listEMRAPI(query) {
  const url = `${endpointPrefix}/patient/emrs`;
  if (query) {
    return axios.get(`${url}?${getQueryString(query)}`);
  }

  return axios.get(url);
}

export function addEMRAPI(emr) {
  const url = `${endpointPrefix}/physician/emrs/`;
  return axios.post(url, emr);
}

export function getEMRHistoryAPI(emrId) {
  const url = `${endpointPrefix}/physician/emrs/${emrId}`;
  return axios.get(url);
}

export function updateEMRAPI(emrId, body) {
  const url = `${endpointPrefix}/physician/emrs/${emrId}`;
  return axios.put(url, body);
}