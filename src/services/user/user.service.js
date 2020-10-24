import { API_URL } from "constant/apiUrl";
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