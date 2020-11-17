import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/user/service`;

export function getServicesAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function getServiceDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}