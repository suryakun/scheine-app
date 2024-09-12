import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Load API key from environment variable
const API_KEY = process.env.REACT_APP_API_KEY || '';

if (!API_KEY) {
  console.warn('API key is not set');
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers['X-API-Key'] = API_KEY;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  api.get<T>(url, config).then(response => response.data);

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  api.post<T>(url, data, config).then(response => response.data);

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  api.put<T>(url, data, config).then(response => response.data);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  api.delete<T>(url, config).then(response => response.data);
