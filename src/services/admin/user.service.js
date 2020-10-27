import axios from 'axios';
import { API_URL } from 'constant/apiUrl';
import qs from 'qs';

const endpointPrefix = `${API_URL}/admin/manage-user`;

export function getUsersAPI(query) {
  const url = `${endpointPrefix}/?${qs.stringify(query)}`;
  return axios.get(url);
}

export function getUserDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}

export function addUserAPI({ email, password, first_name, last_name, phone, DOB, gender, role_id }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, {
    email,
    password,
    first_name,
    last_name,
    phone,
    DOB: DOB.format('yyyy-MM-DD'),
    gender,
    role_id
  });
}

export function updateUserAPI() {

}

export function deleteUserAPI() {}