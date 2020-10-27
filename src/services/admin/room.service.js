import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-room`;

export function getRoomAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function addRoomAPI({ number, name }) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { number: Number(number), name });
}

export function updateRoomAPI(id, { name, number }) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    number: Number(number),
    name
  })
}

export function deleteRoomAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}