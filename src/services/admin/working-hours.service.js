import axios from 'axios';
import { API_URL } from 'constant/apiUrl';

const endpointPrefix = `${API_URL}/admin/manage-working-hours`;

export function getWorkingHoursAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function updateWorkingHourAPI(id, { weekday, isClosed }) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    weekday: weekday,
    is_closed: isClosed
  })
}