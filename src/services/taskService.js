import axios from 'axios';
import { firebaseService } from './firebaseService';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let cachedDbData = null;

const loadDbData = async () => {
  if (cachedDbData) return cachedDbData;
  try {
    const resp = await fetch('/db.json');
    if (!resp.ok) throw new Error(`Failed to fetch db.json: ${resp.status}`);
    cachedDbData = await resp.json();
    return cachedDbData;
  } catch (error) {
    console.error('Error loading db.json:', error);
    throw error;
  }
};

export const taskService = {
  // Tasks CRUD (production uses Firebase, development uses local JSON server)
  getTasks: async () => {
    if (import.meta.env.PROD) {
      return firebaseService.getTasks();
    }
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id) => {
    if (import.meta.env.PROD) {
      return firebaseService.getTask(String(id));
    }
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  addTask: async (task) => {
    if (import.meta.env.PROD) {
      return firebaseService.addTask(task);
    }
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id, task) => {
    if (import.meta.env.PROD) {
      return firebaseService.updateTask(String(id), task);
    }
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id) => {
    if (import.meta.env.PROD) {
      return firebaseService.deleteTask(String(id));
    }
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Activities Log (production uses Firebase, development uses local JSON server)
  getActivities: async () => {
    if (import.meta.env.PROD) {
      return firebaseService.getActivities();
    }
    const response = await api.get('/activities?_sort=timestamp&_order=desc&_limit=10');
    return response.data;
  },

  addActivity: async (activityText) => {
    if (import.meta.env.PROD) {
      return firebaseService.addActivity(activityText);
    }
    const newActivity = {
      text: activityText,
      timestamp: new Date().toISOString(),
    };
    const response = await api.post('/activities', newActivity);
    return response.data;
  },
};
