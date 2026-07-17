import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const TASKS_COLLECTION = 'tasks';
const ACTIVITIES_COLLECTION = 'activities';

export const firebaseService = {
  // Tasks CRUD Operations
  getTasks: async () => {
    try {
      const tasksRef = collection(db, TASKS_COLLECTION);
      const snapshot = await getDocs(tasksRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching tasks from Firestore:', error);
      throw error;
    }
  },

  getTask: async (id) => {
    try {
      const tasksRef = collection(db, TASKS_COLLECTION);
      const snapshot = await getDocs(tasksRef);
      const task = snapshot.docs.find((doc) => doc.id === id);
      return task ? { id: task.id, ...task.data() } : null;
    } catch (error) {
      console.error('Error fetching task from Firestore:', error);
      throw error;
    }
  },

  addTask: async (task) => {
    try {
      const tasksRef = collection(db, TASKS_COLLECTION);
      const docRef = await addDoc(tasksRef, {
        ...task,
        createdAt: task.createdAt || new Date().toISOString(),
      });
      return { id: docRef.id, ...task };
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, id);
      await updateDoc(taskRef, task);
      return { id, ...task };
    } catch (error) {
      console.error('Error updating task in Firestore:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, id);
      await deleteDoc(taskRef);
      return { id };
    } catch (error) {
      console.error('Error deleting task from Firestore:', error);
      throw error;
    }
  },

  // Activities Log Operations
  getActivities: async () => {
    try {
      const activitiesRef = collection(db, ACTIVITIES_COLLECTION);
      const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching activities from Firestore:', error);
      throw error;
    }
  },

  addActivity: async (activityText) => {
    try {
      const activitiesRef = collection(db, ACTIVITIES_COLLECTION);
      const docRef = await addDoc(activitiesRef, {
        text: activityText,
        timestamp: new Date().toISOString(),
      });
      return {
        id: docRef.id,
        text: activityText,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error adding activity to Firestore:', error);
      throw error;
    }
  },
};
