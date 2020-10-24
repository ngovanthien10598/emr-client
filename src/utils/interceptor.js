import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import Cookie from 'js-cookie';
import * as AuthService from 'services/auth/auth.service';
import jwtDecode from 'jwt-decode';
import { API_URL } from 'constant/apiUrl';

export default function setupInterceptor() {
  axios.interceptors.request.use((config) => {
    try {
      const token = Cookie.get('EMR_token');
      if (token && jwtDecode(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {

    }
    return config;
  }, (error) => Promise.reject(error));

  axios.interceptors.response.use(((res) => {
    return res;
  }), async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry  && originalRequest.url !== `${API_URL}/auth/refresh-token/`) {
      Cookie.remove("EMR_token");

      originalRequest._retry = true;

      let refreshToken = Cookie.get('EMR_refresh');

      if (refreshToken && refreshToken.length > 0) {
        try {
          const refreshResponse = await AuthService.refreshToken(refreshToken);
          const newToken = refreshResponse.data.access_token;
          Cookie.set('EMR_token', newToken);

          const config = error.config;
          config.headers['Authorization'] = `Bearer ${newToken}`;

          return new Promise((resolve, reject) => {
            return axios.request(config)
            .then(res => resolve(res))
            .catch(error => reject(error))
          })
        } catch (error) {
          Cookie.remove("EMR_refresh");
          return Promise.reject(error);
        }
      }
    } else {
      const errorMessage = error.response?.data.message || "Unexpected error occurred";
      message.error(errorMessage);
    }

    return Promise.reject(error);
  })
}