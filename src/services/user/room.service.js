import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/user/room`;

export function getRoomAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function getRoomDetailsAPI(roomId) {
  const url = `${endpointPrefix}/${roomId}/`;
  return axios.get(url);
}