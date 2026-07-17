import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate, isOverdue, isDueToday } from '../utils/helpers';
import { useTasks } from '../hooks/useTasks';

const TaskTable = ({ tasks, onDelete }) => {
  const { toggleTaskStatus } = useTasks();

  return (
    <div className="table-responsive">
      <Table hover className="custom-table align-middle mb-0 bg-white">
        <thead>
          <tr>
            <th style={{ width: '40px' }} className="text-center"></th>
            <th>Task Details</th>
            <th>Category</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th style={{ width: '100px' }} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const overdue = isOverdue(task);
            const dueToday = isDueToday(task);
            const isCompleted = task.status === 'Completed';

            let dateClass = 'text-secondary';
            if (isCompleted) {
              dateClass = 'text-decoration-line-through text-muted';
            } else if (overdue) {
              dateClass = 'text-danger fw-semibold';
            } else if (dueToday) {
              dateClass = 'text-warning fw-semibold';
            }

            return (
              <tr key={task.id} className={isCompleted ? 'bg-light bg-opacity-50' : ''}>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleTaskStatus(task.id)}
                    style={{ cursor: 'pointer', transform: 'scale(1.1)' }}
                    id={`table-check-${task.id}`}
                  />
                </td>
                <td>
                  <div>
                    <h6 
                      className={`mb-0 ${isCompleted ? 'text-decoration-line-through text-muted' : 'fw-bold text-dark'}`}
                    >
                      {task.title}
                    </h6>
                    <small className="text-muted text-truncate d-block" style={{ maxWidth: '300px' }}>
                      {task.description}
                    </small>
                  </div>
                </td>
                <td>
                  <span className="badge bg-light text-secondary border px-2.5 py-1 text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>
                    {task.category || 'General'}
                  </span>
                </td>
                <td className={dateClass}>
                  <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '0.85rem' }}>
                    {overdue && !isCompleted && <i className="bi bi-calendar-x-fill text-danger"></i>}
                    {dueToday && !isCompleted && <i className="bi bi-calendar-event-fill text-warning"></i>}
                    {!overdue && !dueToday && <i className="bi bi-calendar3 text-muted"></i>}
                    {formatDate(task.dueDate)}
                  </div>
                </td>
                <td>
                  <StatusBadge type="priority" value={task.priority} />
                </td>
                <td>
                  <StatusBadge type="status" value={task.status} />
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-1.5">
                    <Button
                      as={Link}
                      to={`/edit/${task.id}`}
                      variant="light"
                      size="sm"
                      className="p-1 rounded text-primary"
                      title="Edit Task"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => onDelete(task.id)}
                      className="p-1 rounded text-danger"
                      title="Delete Task"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskTable;
