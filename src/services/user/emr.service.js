import axios from 'axios';
import { API_URL } from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

const endpointPrefix = `${API_URL}/user/emr`;

export function listEMRAPI(query) {
  const url = `${endpointPrefix}/`;
  if (query) {
    return axios.get(`${url}?${getQueryString(query)}`);
  }

  return axios.get(url);
}

export function addEMRAPI(patientId, physicianId) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    patient_id: patientId,
    physician_id: physicianId
  })
}

export function removeImageAPI(emrId, emrImageId) {
  const url = `${endpointPrefix}/${emrId}/image/${emrImageId}/`;
  return axios.delete(url);
}