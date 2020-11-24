import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/user/drug-instruction`;

export function getDrugInstructionsAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}