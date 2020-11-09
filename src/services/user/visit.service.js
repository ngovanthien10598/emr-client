import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/user/visit`;

export function getVisitDataAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}