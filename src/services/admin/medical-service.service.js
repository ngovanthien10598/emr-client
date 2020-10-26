import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-service`;

export function getServicesAPI(search = "") {
  const url = `${endpointPrefix}/?search=${search}`;
  return axios.get(url);
}

export function getServiceDetailsAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.get(url);
}

export function addServiceAPI({ name, price }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { name, price: Number(price) });
}

export function updateServiceAPI(id, { name, price }) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    name,
    price: Number(price)
  })
}

export function deleteServiceAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}