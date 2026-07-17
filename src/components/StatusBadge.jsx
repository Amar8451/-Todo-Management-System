import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ type, value }) => {
  if (type === 'status') {
    const isCompleted = value === 'Completed';
    return (
      <Badge
        bg={isCompleted ? 'success' : 'warning'}
        className="px-2 py-1.5 rounded-pill text-white"
        style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          backgroundColor: isCompleted ? 'var(--success-color)' : 'var(--warning-color)',
        }}
      >
        <i className={`bi bi-${isCompleted ? 'check-circle-fill' : 'hourglass-split'} me-1`}></i>
        {value}
      </Badge>
    );
  }

  if (type === 'priority') {
    let bg = 'secondary';
    let style = {};

    switch (String(value).toLowerCase()) {
      case 'high':
        bg = 'danger';
        style = { backgroundColor: 'var(--danger-color)' };
        break;
      case 'medium':
        bg = 'warning';
        style = { backgroundColor: 'var(--warning-color)', color: '#fff' };
        break;
      case 'low':
        bg = 'info';
        style = { backgroundColor: 'var(--info-color)', color: '#fff' };
        break;
      default:
        break;
    }

    return (
      <Badge
        bg={bg}
        className="px-2 py-1.5 rounded-pill"
        style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          ...style
        }}
      >
        <i className="bi bi-flag-fill me-1"></i>
        {value}
      </Badge>
    );
  }

  return <Badge bg="secondary">{value}</Badge>;
};

export default StatusBadge;
