import React, { useState } from 'react';
import { Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskTable from '../components/TaskTable';
import ConfirmModal from '../components/ConfirmModal';
import { getPriorityWeight } from '../utils/helpers';
import Loader from '../components/Loader';

const AllTasks = ({ limitPriority = null, limitStatus = null }) => {
  const {
    tasks,
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
    deleteTask,
  } = useTasks();

  // Layout View State: 'grid' (cards) or 'list' (table)
  const [viewMode, setViewMode] = useState('grid');

  // Deletion Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'grid' ? 6 : 10;

  // Handler for delete modal trigger
  const handleDeleteClick = (id) => {
    setTaskToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (taskToDeleteId) {
      await deleteTask(taskToDeleteId);
    }
    setShowDeleteModal(false);
    setTaskToDeleteId(null);
  };

  // Helper to clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterStatus('All');
    setFilterPriority('All');
    setFilterCategory('All');
    setSortBy('latest');
    setCurrentPage(1);
  };

  // 1. Apply Filters & Searching
  const filteredTasks = tasks.filter((task) => {
    // Page level constraints (e.g. for Pending Page, Completed Page, High Priority Page)
    if (limitStatus && task.status !== limitStatus) return false;
    if (limitPriority && task.priority !== limitPriority) return false;

    // Search query check (title, category, description)
    const matchSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Status Filter dropdown
    if (filterStatus !== 'All' && task.status !== filterStatus) return false;

    // Priority Filter dropdown
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;

    // Category Filter dropdown
    if (filterCategory !== 'All' && task.category !== filterCategory) return false;

    return true;
  });

  // 2. Apply Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      case 'oldest':
        return a.createdAt.localeCompare(b.createdAt);
      case 'priority':
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'latest':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });

  // 3. Apply Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Header Title Customization
  let pageTitle = 'All Tasks';
  if (limitStatus === 'Completed') pageTitle = 'Completed Tasks';
  if (limitStatus === 'Pending') pageTitle = 'Pending Tasks';
  if (limitPriority === 'High') pageTitle = 'High Priority Tasks';

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <h1 className="fs-3 mb-1">{pageTitle}</h1>
          <p className="text-secondary mb-0">
            Showing {sortedTasks.length} tasks in total.
          </p>
        </div>
        
        <div className="d-flex gap-2">
          {/* Grid / List Toggler */}
          <div className="bg-white border rounded-3 p-1 d-flex shadow-sm">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'white'}
              size="sm"
              onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
              className={`px-3 py-1.5 d-flex align-items-center gap-1.5 rounded-3 ${viewMode === 'grid' ? 'btn-primary-custom' : 'text-secondary'}`}
            >
              <i className="bi bi-grid-fill"></i>
              <span className="d-none d-md-inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'white'}
              size="sm"
              onClick={() => { setViewMode('list'); setCurrentPage(1); }}
              className={`px-3 py-1.5 d-flex align-items-center gap-1.5 rounded-3 ${viewMode === 'list' ? 'btn-primary-custom' : 'text-secondary'}`}
            >
              <i className="bi bi-list-ul"></i>
              <span className="d-none d-md-inline">List</span>
            </Button>
          </div>
          
          <Button as={Link} to="/add" variant="primary" size="sm" className="btn-primary-custom py-2 px-3">
            <i className="bi bi-plus-lg me-1"></i>New Task
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <SearchBar />

      {/* Filter Control Bar */}
      <FilterBar />

      {/* Content Rendering */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger" className="text-center border-0 shadow-sm rounded-3 py-4">
          <i className="bi bi-cloud-slash-fill fs-1 mb-2 d-block text-danger"></i>
          <h6>Connection Error</h6>
          <p className="text-secondary mb-0">{error}</p>
        </Alert>
      ) : sortedTasks.length === 0 ? (
        <div className="bg-white border rounded-3 shadow-sm py-5 px-3 text-center empty-state">
          <i className="bi bi-search-heart empty-state-icon d-block text-muted opacity-40 fs-1 mb-3"></i>
          <h5 className="fw-bold text-dark">No tasks match your search criteria</h5>
          <p className="text-muted mx-auto max-width-sm mb-4" style={{ maxWidth: '400px' }}>
            Try adjusting your status, priority, or category filters or clear your search keyword.
          </p>
          <Button variant="outline-primary" size="sm" onClick={handleClearFilters} className="fw-semibold">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <Row className="g-3.5 mb-4 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {currentItems.map((task) => (
                <Col key={task.id}>
                  <TaskCard task={task} onDelete={handleDeleteClick} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="mb-4">
              <TaskTable tasks={currentItems} onDelete={handleDeleteClick} />
            </div>
          )}

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination className="shadow-sm">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {paginationItems}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        body="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default AllTasks;
