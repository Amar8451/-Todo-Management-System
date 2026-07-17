import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const Sidebar = ({ show, onClose }) => {
  const { tasks } = useTasks();

  // Calculate task counts
  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'High').length;

  const links = [
    { to: '/', end: true, label: 'Dashboard', icon: 'bi-grid-1x2-fill', count: null },
    { to: '/tasks', label: 'All Tasks', icon: 'bi-list-task', count: totalCount },
    { to: '/add', label: 'Add Task', icon: 'bi-plus-circle', count: null },
    { to: '/pending', label: 'Pending', icon: 'bi-hourglass-split', count: pendingCount, badgeBg: 'warning' },
    { to: '/completed', label: 'Completed', icon: 'bi-check2-circle', count: completedCount, badgeBg: 'success' },
    { to: '/high-priority', label: 'High Priority', icon: 'bi-flag-fill', count: highPriorityCount, badgeBg: 'danger' },
  ];

  return (
    <aside className={`sidebar-wrapper ${show ? 'show' : ''}`}>
      <div className="d-flex flex-column h-100 py-3">
        {/* Navigation Items */}
        <nav className="flex-grow-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <i className={`bi ${link.icon}`}></i>
              <span className="me-auto">{link.label}</span>
              {link.count !== null && link.count > 0 && (
                <Badge 
                  pill 
                  bg={link.badgeBg || 'primary'} 
                  className={`ms-2 px-2 py-1 ${link.badgeBg ? '' : 'bg-primary'}`}
                  style={{ fontSize: '0.7rem' }}
                >
                  {link.count}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Help Card */}
        <div className="mx-3 mt-4 p-3 bg-light rounded-3 border">
          <h6 className="fw-bold mb-1" style={{ fontSize: '0.85rem' }}>Need Help?</h6>
          <p className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            Check out TaskFlow shortcuts for lightning-fast task management.
          </p>
          <div className="d-flex gap-1.5 align-items-center">
            <i className="bi bi-keyboard text-primary fs-5"></i>
            <span className="text-secondary fw-semibold" style={{ fontSize: '0.75rem' }}>Press ? for shortcuts</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
