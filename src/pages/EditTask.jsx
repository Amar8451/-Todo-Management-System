import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';

const EditTask = () => {
  const { id } = useParams();
  const { tasks, updateTask, loading } = useTasks();
  const [task, setTask] = useState(null);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    // Find the task locally from context tasks list
    const foundTask = tasks.find((t) => String(t.id) === String(id));
    setTask(foundTask);
    setSearching(false);
  }, [id, tasks]);

  const handleUpdate = async (updatedPayload) => {
    await updateTask(id, updatedPayload);
  };

  if (searching || loading) {
    return <Loader />;
  }

  if (!task) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto' }} className="text-center">
        <Alert variant="warning" className="border-0 shadow-sm rounded-3 py-4 mb-4">
          <i className="bi bi-exclamation-circle-fill fs-1 text-warning mb-2 d-block"></i>
          <h5 className="fw-bold">Task Not Found</h5>
          <p className="text-secondary mb-0">
            The task with ID <strong>{id}</strong> could not be found or has been deleted.
          </p>
        </Alert>
        <Button as={Link} to="/tasks" variant="primary" className="btn-primary-custom px-4 fw-semibold">
          Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="mb-4">
        <h1 className="fs-3 mb-1">Edit Task</h1>
        <p className="text-secondary mb-0">Modify the fields below to update the task details.</p>
      </div>

      <TaskForm initialTask={task} onSubmit={handleUpdate} isEdit={true} />
    </div>
  );
};

export default EditTask;
