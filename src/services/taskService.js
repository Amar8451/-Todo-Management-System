import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Tasks CRUD (production reads static DB, writes are no‑ops)
  getTasks: async () => {
    if (import.meta.env.PROD) {
      const resp = await fetch('/db.json');
      const data = await resp.json();
      return data.tasks || [];
    }
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id) => {
    if (import.meta.env.PROD) {
      const tasks = await taskService.getTasks();
      return tasks.find(t => t.id === Number(id));
    }
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  addTask: async (task) => {
    if (import.meta.env.PROD) {
      console.warn('Add task is disabled in production static mode');
      return task; // no persistence
    }
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id, task) => {
    if (import.meta.env.PROD) {
      console.warn('Update task is disabled in production static mode');
      return task;
    }
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id) => {
    if (import.meta.env.PROD) {
      console.warn('Delete task is disabled in production static mode');
      return { id };
    }
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Activities Log (production reads static DB)
  getActivities: async () => {
    if (import.meta.env.PROD) {
      const resp = await fetch('/db.json');
      const data = await resp.json();
      const activities = data.activities || [];
      // sort newest first, limit 10
      return activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    }
    const response = await api.get('/activities?_sort=timestamp&_order=desc&_limit=10');
    return response.data;
  },

  addActivity: async (activityText) => {
    if (import.meta.env.PROD) {
      console.warn('Add activity disabled in production static mode');
      return { text: activityText, timestamp: new Date().toISOString() };
    }
    const newActivity = {
      text: activityText,
      timestamp: new Date().toISOString(),
    };
    const response = await api.post('/activities', newActivity);
    return response.data;
  },
};
