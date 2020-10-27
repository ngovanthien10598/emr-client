import axios from 'axios';
import { API_URL } from 'constant/apiUrl';
import qs from 'qs';

const endpointPrefix = `${API_URL}/admin/manage-user`;

export function getUsersAPI(search = "", role_name, role_id) {
  const url = `${endpointPrefix}/?${qs.stringify({ search: search, role_name: role_name, role_id: role_id })}`;
  return axios.get(url);
}

export function getUserDetailsAPI(id) {

}

export function addUserAPI() {

}

export function updateUserAPI() {

}

export function deleteUserAPI() {}