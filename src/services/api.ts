import axios from 'axios';
import type { AxiosError } from 'axios';
import { NetworkError } from '../types/errors';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      throw new NetworkError(
        error.response.data?.message || 'Server error occurred',
        error.response.status
      );
    } else if (error.request) {
      // Request made but no response
      throw new NetworkError('No response from server. Check your connection.');
    } else {
      // Request setup error
      throw new NetworkError(error.message);
    }
  }
);

export default apiClient;
