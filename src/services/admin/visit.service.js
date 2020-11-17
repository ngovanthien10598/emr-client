import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/admin/manage-visit`;

export function getVisitDataAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function createVisitAPI({ patientId, roomId }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    room_id: roomId,
    patient_id: patientId
  })
}