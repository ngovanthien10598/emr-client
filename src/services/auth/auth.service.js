import { API_URL } from "constant/apiUrl";
import axios from 'axios';


const endpointPrefix = `${API_URL}/auth`;

/**
 * Login to system
 * @param email
 * @param password
 */
export function login(email, password) {
  const url = `${endpointPrefix}/login/`;
  return axios.post(url, {
    email: email,
    password: password
  });
}

/**
 * This function is used to get new access token from refresh token
 * when current access token is expired
 * @param refreshToken Refresh token from last login
 */
export function refreshToken(refreshToken) {
  const url = `${endpointPrefix}/refresh-token/`;
  return axios.post(url, {
    refresh_token: refreshToken
  });
}


export function verifyEmailAPI(token) {
  const url = `${endpointPrefix}/verify-email/${token}/`;
  return axios.get(url);
}