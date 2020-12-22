import { NODE_URL } from "constant/apiUrl";
import axios from 'axios';


const endpointPrefix = `${NODE_URL}/api/patient/emrs`;

export function listAllEmrs() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}