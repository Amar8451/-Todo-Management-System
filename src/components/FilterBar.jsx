import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const FilterBar = () => {
  const {
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    categories,
  } = useTasks();

  return (
    <div className="bg-white p-3 border rounded-3 shadow-sm mb-4">
      <Row className="g-3 align-items-center">
        {/* Status Filter */}
        <Col xs={12} sm={6} md={3}>
          <Form.Group controlId="filterStatus">
            <Form.Label className="text-secondary fw-semibold small mb-1">
              <i className="bi bi-funnel me-1"></i>Status
            </Form.Label>
            <Form.Select
              size="sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="custom-form-control"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Priority Filter */}
        <Col xs={12} sm={6} md={3}>
          <Form.Group controlId="filterPriority">
            <Form.Label className="text-secondary fw-semibold small mb-1">
              <i className="bi bi-flag-fill me-1 text-danger"></i>Priority
            </Form.Label>
            <Form.Select
              size="sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="custom-form-control"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Category Filter */}
        <Col xs={12} sm={6} md={3}>
          <Form.Group controlId="filterCategory">
            <Form.Label className="text-secondary fw-semibold small mb-1">
              <i className="bi bi-tag-fill me-1 text-primary"></i>Category
            </Form.Label>
            <Form.Select
              size="sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="custom-form-control"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Sorting Dropdown */}
        <Col xs={12} sm={6} md={3}>
          <Form.Group controlId="sortBy">
            <Form.Label className="text-secondary fw-semibold small mb-1">
              <i className="bi bi-sort-down me-1"></i>Sort By
            </Form.Label>
            <Form.Select
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="custom-form-control"
            >
              <option value="latest">Latest Created</option>
              <option value="oldest">Oldest Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="title">Title (A-Z)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
