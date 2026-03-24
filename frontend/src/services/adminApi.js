import api from './api';

export const adminApi = {
  // Dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard-stats');
    return response.data;
  },

  // User management
  getAllUsers: async (params = {}) => {
    const { page = 1, limit = 10, search, role } = params;
    const queryParams = new URLSearchParams();
    
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (search) queryParams.append('search', search);
    if (role) queryParams.append('role', role);
    
    const response = await api.get(`/admin/users?${queryParams.toString()}`);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Seller management
  getAllSellers: async (params = {}) => {
    const { page = 1, limit = 10, search, city } = params;
    const queryParams = new URLSearchParams();
    
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (search) queryParams.append('search', search);
    if (city) queryParams.append('city', city);
    
    const response = await api.get(`/admin/sellers?${queryParams.toString()}`);
    return response.data;
  },

  // Ads management (placeholder)
  getAllAds: async () => {
    const response = await api.get('/admin/ads');
    return response.data;
  },

  // Payments (placeholder)
  getAllPayments: async () => {
    const response = await api.get('/admin/payments');
    return response.data;
  }
};

export default adminApi;
