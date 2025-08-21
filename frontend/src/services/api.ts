import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
};

// Ideas API
export const ideasAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get('/ideas', { params }),
  getById: (id: string) => api.get(`/ideas/${id}`),
  create: (idea: any) => api.post('/ideas', idea),
  update: (id: string, idea: any) => api.put(`/ideas/${id}`, idea),
  delete: (id: string) => api.delete(`/ideas/${id}`),
  generateAI: (data: {
    industry: string;
    interests: string[];
    budget: string;
    experience?: string;
    marketConstraints?: string[];
  }) => api.post('/ideas/generate-ai', data),
  getAIInsights: (id: string) => api.get(`/ideas/${id}/ai-insights`),
};

// Integrations API
export const integrationsAPI = {
  getAll: () => api.get('/integrations'),
  remove: (service: string) => api.delete(`/integrations/${service}`),
};

export default api;
