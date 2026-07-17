import React, { createContext, useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import confetti from 'canvas-confetti';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  
  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
      setError('Could not connect to the database server. Make sure JSON Server is running.');
      showToast('Error loading tasks from database', 'danger');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Fetch recent activities
  const fetchActivities = useCallback(async () => {
    try {
      const data = await taskService.getActivities();
      setActivities(data);
    } catch (err) {
      console.error('Failed to fetch activities', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTasks();
    fetchActivities();
  }, [fetchTasks, fetchActivities]);

  // Add Task
  const addTask = async (taskData) => {
    setLoading(true);
    try {
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      const createdTask = await taskService.addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      
      // Log activity
      const logMessage = `Created task: "${createdTask.title}"`;
      await taskService.addActivity(logMessage);
      fetchActivities();

      showToast('Task created successfully!', 'success');
      return createdTask;
    } catch (err) {
      console.error('Failed to add task', err);
      showToast('Failed to create task.', 'danger');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async (id, updatedData) => {
    setLoading(true);
    try {
      const result = await taskService.updateTask(id, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? result : t))
      );

      // Log activity
      const logMessage = `Updated task: "${result.title}"`;
      await taskService.addActivity(logMessage);
      fetchActivities();

      showToast('Task updated successfully!', 'success');
      return result;
    } catch (err) {
      console.error('Failed to update task', err);
      showToast('Failed to update task.', 'danger');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle Task Status (Pending / Completed)
  const toggleTaskStatus = async (id) => {
    const taskToToggle = tasks.find((t) => t.id === id);
    if (!taskToToggle) return;

    const newStatus = taskToToggle.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTask = { ...taskToToggle, status: newStatus };

    try {
      const result = await taskService.updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? result : t))
      );

      // Trigger Confetti if completed!
      if (newStatus === 'Completed') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
        showToast('Hurray! Task completed! 🎉', 'success');
      } else {
        showToast('Task set back to pending', 'info');
      }

      // Log activity
      const logMessage = `Marked task "${result.title}" as ${newStatus}`;
      await taskService.addActivity(logMessage);
      fetchActivities();
    } catch (err) {
      console.error('Failed to toggle task status', err);
      showToast('Failed to toggle task status.', 'danger');
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) return;

    setLoading(true);
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));

      // Log activity
      const logMessage = `Deleted task: "${taskToDelete.title}"`;
      await taskService.addActivity(logMessage);
      fetchActivities();

      showToast('Task deleted successfully.', 'warning');
    } catch (err) {
      console.error('Failed to delete task', err);
      showToast('Failed to delete task.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories for filter dropdown
  const categories = ['All', ...new Set(tasks.map((t) => t.category).filter(Boolean))];

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activities,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        filterCategory,
        setFilterCategory,
        sortBy,
        setSortBy,
        toasts,
        showToast,
        removeToast,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        categories,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
