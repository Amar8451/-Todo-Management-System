import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? 'https://todo-api.onrender.com' : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Tasks CRUD
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

  // Activities Log
  getActivities: async () => {
    const response = await api.get('/activities?_sort=timestamp&_order=desc&_limit=10');
    // Note: json-server v0.x uses _sort and _order. For v1.x (alpha) it might vary, 
    // but just sorting client-side or requesting standard json-server query parameters is robust.
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
