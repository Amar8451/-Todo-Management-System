import React from 'react';
import { Container } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  const { addTask } = useTasks();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="mb-4">
        <h1 className="fs-3 mb-1">Create New Task</h1>
        <p className="text-secondary mb-0">Fill in the fields below to add a new task to your dashboard.</p>
      </div>

      <TaskForm onSubmit={addTask} isEdit={false} />
    </div>
  );
};

export default AddTask;
