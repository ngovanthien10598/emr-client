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

export function removeImageAPI(emrId, emrImageId) {
  const url = `${endpointPrefix}/${emrId}/image/${emrImageId}/`;
  return axios.delete(url);
}