import axios from 'axios';

import { API_URL } from "constant/apiUrl";

const endpointPrefix = `${API_URL}/admin/manage-drug-instruction`;

export function getDrugInstructionsAPI() {
  const url = `${endpointPrefix}/`;
  return axios.get(url);
}

export function addDrugInstructionAPI(instruction) {
  const url = `${endpointPrefix}/`;
  return axios.post(url, { instruction: instruction });
}

export function updateDrugInstructionAPI(id, instruction) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.put(url, {
    instruction: instruction
  })
}

export function deleteDrugInstructionAPI(id) {
  const url = `${endpointPrefix}/${id}/`;
  return axios.delete(url);
}