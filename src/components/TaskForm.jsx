import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTodayDateString } from '../utils/helpers';

const PRESET_CATEGORIES = ['Development', 'Design', 'Marketing', 'Personal', 'Health', 'Finance'];

const TaskForm = ({ initialTask, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const todayStr = getTodayDateString();

  // Local state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [category, setCategory] = useState('Development');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [dueDate, setDueDate] = useState(todayStr);

  // Validation States
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form if initialTask is provided (Edit Mode)
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority || 'Medium');
      setStatus(initialTask.status || 'Pending');
      
      const isPreset = PRESET_CATEGORIES.includes(initialTask.category);
      if (isPreset) {
        setCategory(initialTask.category);
        setShowCustomCategory(false);
      } else if (initialTask.category) {
        setCategory('Custom');
        setCustomCategory(initialTask.category);
        setShowCustomCategory(true);
      } else {
        setCategory('Development');
        setShowCustomCategory(false);
      }
      
      setDueDate(initialTask.dueDate || todayStr);
    }
  }, [initialTask, todayStr]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    if (val === 'Custom') {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Task title must be at least 5 characters long.';
    }

    // Category validation
    if (category === 'Custom' && !customCategory.trim()) {
      newErrors.category = 'Please enter a custom category name.';
    }

    // Due Date validation
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    } else if (!isEdit && dueDate < todayStr) {
      // Prevent past dates for new tasks only
      newErrors.dueDate = 'Due date cannot be in the past.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const finalCategory = category === 'Custom' ? customCategory.trim() : category;

    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category: finalCategory,
      dueDate,
    };

    if (isEdit && initialTask) {
      taskPayload.id = initialTask.id;
      taskPayload.createdAt = initialTask.createdAt;
    }

    try {
      await onSubmit(taskPayload);
      navigate(isEdit ? '/tasks' : '/');
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, submit: 'Failed to save task. Try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white p-4 border rounded-3 shadow-sm">
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

      <Row className="g-3">
        {/* Task Title */}
        <Col xs={12}>
          <Form.Group controlId="taskTitle">
            <Form.Label className="fw-bold text-secondary">Task Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Complete React Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
              className="custom-form-control"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Task Description */}
        <Col xs={12}>
          <Form.Group controlId="taskDescription">
            <Form.Label className="fw-bold text-secondary">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter brief details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="custom-form-control"
            />
          </Form.Group>
        </Col>

        {/* Category Picker */}
        <Col xs={12} sm={6}>
          <Form.Group controlId="taskCategory">
            <Form.Label className="fw-bold text-secondary">Category <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={category}
              onChange={handleCategoryChange}
              className="custom-form-control"
            >
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="Custom">+ Custom Category</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Custom Category Input */}
        {showCustomCategory && (
          <Col xs={12} sm={6}>
            <Form.Group controlId="taskCustomCategory">
              <Form.Label className="fw-bold text-secondary">Enter Custom Category <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Finance"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                isInvalid={!!errors.category}
                className="custom-form-control"
              />
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}

        {/* Priority Select */}
        <Col xs={12} sm={showCustomCategory ? 12 : 6}>
          <Form.Group controlId="taskPriority">
            <Form.Label className="fw-bold text-secondary">Priority <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="custom-form-control"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Due Date */}
        <Col xs={12} sm={6}>
          <Form.Group controlId="taskDueDate">
            <Form.Label className="fw-bold text-secondary">Due Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              isInvalid={!!errors.dueDate}
              className="custom-form-control"
            />
            <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Status Select (Editable only during edit mode or visible always) */}
        <Col xs={12} sm={6}>
          <Form.Group controlId="taskStatus">
            <Form.Label className="fw-bold text-secondary">Status <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="custom-form-control"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Submit Actions */}
        <Col xs={12} className="d-flex justify-content-end gap-2.5 mt-4">
          <Button
            variant="light"
            onClick={() => navigate(-1)}
            disabled={submitting}
            className="fw-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="fw-semibold px-4 btn-primary-custom"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
