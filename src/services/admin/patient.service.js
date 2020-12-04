import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/admin/patient`;

export function listAllPatientsAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function getPatientDetailsAPI(patientId) {
  const url = `${endpointPrefix}/${patientId}/`;
  return axios.get(url);
}