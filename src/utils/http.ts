import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, createApiUrl } from '../config/api.config';

/**
 * Centralized HTTP client for the application.
 * Handles common functionality like:
 * - Base URL configuration
 * - Authentication headers
 * - Request/response interceptors
 * - Error handling
 * - Request timeouts
 */

// Create axios instance with default config
const http = axios.create({
  timeout: API_CONFIG.REQUEST.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * - Adds authentication token from localStorage
 * - Handles request configuration
 */
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Handles common response processing
 * - Global error handling
 */
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear token if it's expired or invalid
      localStorage.removeItem('token');

      // Redirect to login if the user was authenticated
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    // Handle server errors
    if (error.response?.status === 500) {
      console.error('Server error:', error);
    }

    return Promise.reject(error);
  }
);

/**
 * Typed HTTP GET request
 * @param endpoint API endpoint
 * @param config Additional axios config
 */
export const get = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> =>
  http
    .get<T>(createApiUrl(endpoint), config)
    .then((response: AxiosResponse<T>) => response.data);

/**
 * Typed HTTP POST request
 * @param endpoint API endpoint
 * @param data Request body
 * @param config Additional axios config
 */
export const post = <T, D = any>(
  endpoint: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> =>
  http
    .post<T>(createApiUrl(endpoint), data, config)
    .then((response: AxiosResponse<T>) => response.data);

/**
 * Typed HTTP PUT request
 * @param endpoint API endpoint
 * @param data Request body
 * @param config Additional axios config
 */
export const put = <T, D = any>(
  endpoint: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> =>
  http
    .put<T>(createApiUrl(endpoint), data, config)
    .then((response: AxiosResponse<T>) => response.data);

/**
 * Typed HTTP DELETE request
 * @param endpoint API endpoint
 * @param config Additional axios config
 */
export const remove = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> =>
  http
    .delete<T>(createApiUrl(endpoint), config)
    .then((response: AxiosResponse<T>) => response.data);

// Default export
export default http;
