import axios from 'axios';
import { API_URL } from 'constant/apiUrl';
import { getQueryString } from 'utils/string';

const endpointPrefix = `${API_URL}/admin/manage-visit`;

export function getVisitDataAPI(query) {
  const url = `${endpointPrefix}/`;
  if (query) {
    return axios.get(`${url}?${getQueryString(query)}`);
  }
  return axios.get(url);
}

export function createVisitAPI({ patientId, roomId }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    room_id: roomId,
    patient_id: patientId
  })
}