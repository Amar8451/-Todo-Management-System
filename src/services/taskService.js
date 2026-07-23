import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // ─── Tasks CRUD ────────────────────────────────────────────────────────────
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  addTask: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // ─── Activities Log ────────────────────────────────────────────────────────
  getActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  addActivity: async (activityText) => {
    const newActivity = {
      text: activityText,
      timestamp: new Date().toISOString(),
    };
    const response = await api.post('/activities', newActivity);
    return response.data;
  },
};
