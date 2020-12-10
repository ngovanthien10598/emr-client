import { API_URL, NODE_URL } from "constant/apiUrl";
import axios from 'axios';

const endpointPrefix = `${API_URL}/user`;

/**
* Get user profile
* @param token Access token
*/
export function getProfile() {
  const url = `${endpointPrefix}/profile/`;
  return axios.get(url);
}

export function addBlockChainUserAPI(userId, role = "user") {
  if (role !== "user" && role !== "patient") return Promise.reject(new Error('Unknown role'));
  const url = `${NODE_URL}/api/register-${role}`;
  return axios.post(url, { user_id: userId });
}