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
  // Tasks CRUD (production uses Firebase if available, otherwise falls back to db.json)
  getTasks: async () => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.getTasks();
      } catch (error) {
        console.warn('Firebase getTasks failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to db.json in production or always in development
    if (import.meta.env.PROD) {
      const data = await loadDbData();
      return data.tasks || [];
    }
    
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id) => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.getTask(String(id));
      } catch (error) {
        console.warn('Firebase getTask failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to db.json in production or always in development
    if (import.meta.env.PROD) {
      const data = await loadDbData();
      return data.tasks?.find(t => t.id === id) || null;
    }
    
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  addTask: async (task) => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.addTask(task);
      } catch (error) {
        console.warn('Firebase addTask failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to db.json in production (create in-memory)
    if (import.meta.env.PROD) {
      const newTask = {
        id: Date.now().toString(),
        ...task,
        createdAt: task.createdAt || new Date().toISOString(),
      };
      console.warn('Task saved to memory only - add Firebase env vars for persistence');
      return newTask;
    }
    
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id, task) => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.updateTask(String(id), task);
      } catch (error) {
        console.warn('Firebase updateTask failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to in-memory in production
    if (import.meta.env.PROD) {
      console.warn('Task updated in memory only - add Firebase env vars for persistence');
      return { id, ...task };
    }
    
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id) => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.deleteTask(String(id));
      } catch (error) {
        console.warn('Firebase deleteTask failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to in-memory in production
    if (import.meta.env.PROD) {
      console.warn('Task deleted from memory only - add Firebase env vars for persistence');
      return { id };
    }
    
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Activities Log (production uses Firebase if available, otherwise falls back to db.json)
  getActivities: async () => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.getActivities();
      } catch (error) {
        console.warn('Firebase getActivities failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to db.json in production or always in development
    if (import.meta.env.PROD) {
      const data = await loadDbData();
      return (data.activities || []).sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ).slice(0, 10);
    }
    
    const response = await api.get('/activities?_sort=timestamp&_order=desc&_limit=10');
    return response.data;
  },

  addActivity: async (activityText) => {
    // Try Firebase first if in production and it's enabled
    if (import.meta.env.PROD && firebaseService.isEnabled()) {
      try {
        return await firebaseService.addActivity(activityText);
      } catch (error) {
        console.warn('Firebase addActivity failed, falling back to db.json:', error);
      }
    }
    
    // Fallback to in-memory in production or always in development
    const newActivity = {
      id: Date.now().toString(),
      text: activityText,
      timestamp: new Date().toISOString(),
    };
    
    if (import.meta.env.PROD) {
      console.warn('Activity saved to memory only - add Firebase env vars for persistence');
    } else {
      const response = await api.post('/activities', newActivity);
      return response.data;
    }
    
    return newActivity;
  },
};
