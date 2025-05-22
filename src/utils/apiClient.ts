import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, createApiUrl } from '../config/api.config';

/**
 * API Client
 * 
 * This is a wrapper around the HTTP utility with specific API configurations.
 */

// Create API-specific axios instance
const apiClient = axios.create({
  timeout: API_CONFIG.REQUEST.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Session expired or unauthorized
        localStorage.removeItem('token');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.assign('/login');
        }
      }
      
      // Log server errors in development
      if (error.response.status >= 500 && !import.meta.env.PROD) {
        console.error('Server Error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * GET request to API
 * @param endpoint - API endpoint path
 * @param config - Axios request config
 * @returns Promise with response data
 */
export const get = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.get<T>(createApiUrl(endpoint), config)
    .then((response: AxiosResponse<T>) => response.data);
};

/**
 * POST request to API
 * @param endpoint - API endpoint path
 * @param data - Request body
 * @param config - Axios request config
 * @returns Promise with response data
 */
export const post = <T, D = any>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.post<T>(createApiUrl(endpoint), data, config)
    .then((response: AxiosResponse<T>) => response.data);
};

/**
 * PUT request to API
 * @param endpoint - API endpoint path
 * @param data - Request body
 * @param config - Axios request config
 * @returns Promise with response data
 */
export const put = <T, D = any>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.put<T>(createApiUrl(endpoint), data, config)
    .then((response: AxiosResponse<T>) => response.data);
};

/**
 * DELETE request to API
 * @param endpoint - API endpoint path
 * @param config - Axios request config
 * @returns Promise with response data
 */
export const del = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.delete<T>(createApiUrl(endpoint), config)
    .then((response: AxiosResponse<T>) => response.data);
};

export default apiClient;