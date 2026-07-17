import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AllTasks from '../pages/AllTasks';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTask';
import Completed from '../pages/Completed';
import Pending from '../pages/Pending';
import HighPriority from '../pages/HighPriority';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<AllTasks />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/pending" element={<Pending />} />
      <Route path="/high-priority" element={<HighPriority />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
