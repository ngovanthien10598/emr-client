import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/user/patient`;

export function listAllPatientsAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function getPatientDetailsAPI(patientId) {
  const url = `${endpointPrefix}/${patientId}/`;
  return axios.get(url);
}

export function createPatientAPI({ first_name, last_name, phone, DOB, gender }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    first_name,
    last_name,
    phone,
    DOB,
    gender
  })
}

