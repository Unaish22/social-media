'use client'

import axios, { AxiosError } from 'axios';

// Configure axios with Next.js-friendly defaults
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor for Next.js apps
apiClient.interceptors.request.use((config) => {
  // Add any request modifications here
  return config;
}, (error) => Promise.reject(error));

// Enhanced response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const retryDelay = originalRequest.retryDelay || 1000;

    // Retry on network errors or 5xx responses
    if (!error.response || error.response.status >= 500) {
      await new Promise(res => setTimeout(res, retryDelay));
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

interface ApiConfig {
  url: string
  data?: any
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  retry?: boolean
  retryDelay?: number
}

export async function apiRequest<T>(config: ApiConfig): Promise<T> {
  try {
    const response = await apiClient({
      method: config.method || 'GET',
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<{ message?: string }>;
      throw new Error(
        serverError.response?.data?.message || 
        serverError.message || 
        'An unknown error occurred'
      );
    }
    throw error;
  }
}

// Utility functions
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
};

export const isUnauthorizedError = (error: unknown): boolean => {
  return axios.isAxiosError(error) && error.response?.status === 401;
};

export const isForbiddenError = (error: unknown): boolean => {
  return axios.isAxiosError(error) && error.response?.status === 403;
};
