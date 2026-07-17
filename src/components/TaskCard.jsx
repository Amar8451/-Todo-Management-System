import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate, isOverdue, isDueToday } from '../utils/helpers';
import { useTasks } from '../hooks/useTasks';

const TaskCard = ({ task, onDelete }) => {
  const { toggleTaskStatus } = useTasks();
  
  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);
  
  let dateColorClass = 'text-muted';
  let dateIconClass = 'bi-calendar3';
  let cardBorder = '';

  if (task.status === 'Completed') {
    dateColorClass = 'text-success text-opacity-75 text-decoration-line-through';
    cardBorder = 'border-success border-opacity-20';
  } else if (overdue) {
    dateColorClass = 'text-danger fw-semibold';
    dateIconClass = 'bi-calendar-x-fill';
    cardBorder = 'border-danger border-opacity-20';
  } else if (dueToday) {
    dateColorClass = 'text-warning fw-semibold';
    dateIconClass = 'bi-calendar-event-fill';
    cardBorder = 'border-warning border-opacity-25';
  }

  return (
    <Card className={`task-card h-100 ${cardBorder}`}>
      <Card.Body className="d-flex flex-column p-0">
        {/* Card Header: Category & Priority */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span 
            className="badge bg-secondary-light text-secondary rounded px-2.5 py-1 fw-bold text-uppercase"
            style={{ fontSize: '0.65rem', backgroundColor: '#f1f5f9' }}
          >
            {task.category || 'General'}
          </span>
          <StatusBadge type="priority" value={task.priority} />
        </div>

        {/* Card Body: Checkbox & Title */}
        <div className="d-flex gap-2.5 align-items-start mb-2">
          <Form.Check 
            type="checkbox"
            checked={task.status === 'Completed'}
            onChange={() => toggleTaskStatus(task.id)}
            className="task-checkbox mt-1"
            style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
            id={`task-check-${task.id}`}
          />
          <div className="flex-grow-1">
            <h5 
              className={`fs-6 mb-1 text-dark text-wrap ${task.status === 'Completed' ? 'text-decoration-line-through text-muted' : 'fw-bold'}`}
              style={{ lineHeight: '1.4' }}
            >
              {task.title}
            </h5>
            <p 
              className="text-secondary mb-0 text-wrap text-truncate-3"
              style={{ fontSize: '0.8rem', minHeight: '3.6em' }}
            >
              {task.description}
            </p>
          </div>
        </div>

        {/* Card Footer: Due Date & Actions */}
        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
          <span className={`small d-flex align-items-center gap-1.5 ${dateColorClass}`} style={{ fontSize: '0.78rem' }}>
            <i className={`bi ${dateIconClass}`}></i>
            {overdue && !dueToday && <span className="d-none d-xl-inline">Overdue: </span>}
            {dueToday && <span className="d-none d-xl-inline">Due Today: </span>}
            {formatDate(task.dueDate)}
          </span>
          
          <div className="d-flex gap-1">
            <Button
              as={Link}
              to={`/edit/${task.id}`}
              variant="light"
              size="sm"
              className="p-1.5 rounded d-flex align-items-center justify-content-center text-primary"
              title="Edit Task"
              style={{ width: '28px', height: '28px' }}
            >
              <i className="bi bi-pencil-fill" style={{ fontSize: '0.8rem' }}></i>
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded d-flex align-items-center justify-content-center text-danger"
              title="Delete Task"
              style={{ width: '28px', height: '28px' }}
            >
              <i className="bi bi-trash-fill" style={{ fontSize: '0.8rem' }}></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
