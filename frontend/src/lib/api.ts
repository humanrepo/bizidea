import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any global request logic here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle global errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/auth/login'
    } else if (error.response?.status === 403) {
      toast.error('Accès refusé')
    } else if (error.response?.status >= 500) {
      toast.error('Erreur serveur. Veuillez réessayer.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Délai d\'attente dépassé')
    } else if (!error.response) {
      toast.error('Erreur de connexion')
    }
    
    return Promise.reject(error)
  }
)

// API endpoints
export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/auth/login', { email, password }),
    register: (data: any) =>
      apiClient.post('/auth/register', data),
    logout: () =>
      apiClient.post('/auth/logout'),
    verify: () =>
      apiClient.get('/auth/verify'),
    refreshToken: () =>
      apiClient.post('/auth/refresh'),
  },

  // Users
  users: {
    getProfile: () =>
      apiClient.get('/users/profile'),
    updateProfile: (data: any) =>
      apiClient.put('/users/profile', data),
    uploadAvatar: (file: File) => {
      const formData = new FormData()
      formData.append('avatar', file)
      return apiClient.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    },
  },

  // Business Ideas
  ideas: {
    generate: (data: any) =>
      apiClient.post('/ideas/generate', data),
    getAll: (params?: any) =>
      apiClient.get('/ideas', { params }),
    getById: (id: number) =>
      apiClient.get(`/ideas/${id}`),
    create: (data: any) =>
      apiClient.post('/ideas', data),
    update: (id: number, data: any) =>
      apiClient.put(`/ideas/${id}`, data),
    delete: (id: number) =>
      apiClient.delete(`/ideas/${id}`),
    analyze: (id: number) =>
      apiClient.post(`/ideas/${id}/analyze`),
    like: (id: number) =>
      apiClient.post(`/ideas/${id}/like`),
    bookmark: (id: number) =>
      apiClient.post(`/ideas/${id}/bookmark`),
  },

  // Analysis
  analysis: {
    getMarketData: (keywords: string[]) =>
      apiClient.post('/analysis/market', { keywords }),
    getCompetitionData: (keywords: string[]) =>
      apiClient.post('/analysis/competition', { keywords }),
    getTrends: (location?: string) =>
      apiClient.get('/analysis/trends', { params: { location } }),
  },

  // Community
  community: {
    getPosts: (params?: any) =>
      apiClient.get('/community/posts', { params }),
    getPost: (id: number) =>
      apiClient.get(`/community/posts/${id}`),
    createPost: (data: any) =>
      apiClient.post('/community/posts', data),
    updatePost: (id: number, data: any) =>
      apiClient.put(`/community/posts/${id}`, data),
    deletePost: (id: number) =>
      apiClient.delete(`/community/posts/${id}`),
    likePost: (id: number) =>
      apiClient.post(`/community/posts/${id}/like`),
    getComments: (postId: number) =>
      apiClient.get(`/community/posts/${postId}/comments`),
    addComment: (postId: number, content: string) =>
      apiClient.post(`/community/posts/${postId}/comments`, { content }),
  },

  // Chat
  chat: {
    getSessions: () =>
      apiClient.get('/chat/sessions'),
    getSession: (id: number) =>
      apiClient.get(`/chat/sessions/${id}`),
    createSession: (data: any) =>
      apiClient.post('/chat/sessions', data),
    deleteSession: (id: number) =>
      apiClient.delete(`/chat/sessions/${id}`),
    sendMessage: (sessionId: number, message: string, context?: any) =>
      apiClient.post(`/chat/sessions/${sessionId}/messages`, {
        message,
        context,
      }),
    getMessages: (sessionId: number, params?: any) =>
      apiClient.get(`/chat/sessions/${sessionId}/messages`, { params }),
  },
}

export default apiClient