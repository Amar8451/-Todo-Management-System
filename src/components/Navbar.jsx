import React, { useRef, useEffect } from 'react';
import { Navbar, Container, Form, InputGroup, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { isOverdue, isDueToday } from '../utils/helpers';

const NavigationBar = ({ onToggleSidebar }) => {
  const { searchQuery, setSearchQuery, tasks } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  // Calculate alerts (tasks due today or overdue)
  const overdueTasks = tasks.filter(isOverdue);
  const dueTodayTasks = tasks.filter(isDueToday);
  const alertCount = overdueTasks.length + dueTodayTasks.length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/tasks') {
      navigate('/tasks');
    }
  };

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="border-bottom py-2 shadow-sm" style={{ zIndex: 1050 }}>
      <Container fluid className="px-4">
        {/* Toggle Button for Sidebar on Mobile */}
        <Button
          variant="light"
          onClick={onToggleSidebar}
          className="d-lg-none me-2 px-2 py-1"
          aria-label="Toggle Sidebar"
        >
          <i className="bi bi-list fs-4"></i>
        </Button>

        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 me-4">
          <div className="bg-primary text-white rounded-3 p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <i className="bi bi-check2-square fs-5"></i>
          </div>
          <span className="fw-bold tracking-tight text-dark" style={{ letterSpacing: '-0.5px' }}>
            TaskFlow
          </span>
        </Navbar.Brand>

        {/* Search Bar - Hidden on mobile view */}
        <Form className="d-none d-md-flex flex-grow-1 max-width-md" style={{ maxWidth: '400px' }}>
          <InputGroup size="sm" className="rounded-3 overflow-hidden border">
            <InputGroup.Text className="bg-white border-0 text-muted ps-3">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              ref={searchInputRef}
              type="search"
              placeholder="Search tasks... (Press '/' to focus)"
              className="border-0 bg-white py-2"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ fontSize: '0.85rem' }}
            />
          </InputGroup>
        </Form>

        {/* Right Side Icons */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          {/* Create Task Shortcut Button */}
          <Button
            as={Link}
            to="/add"
            variant="primary"
            size="sm"
            className="d-none d-sm-flex align-items-center gap-1.5 px-3 py-2 btn-primary-custom"
          >
            <i className="bi bi-plus-lg fw-bold"></i>
            <span>Add Task</span>
          </Button>

          {/* Notifications Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="position-relative cursor-pointer py-1 ps-2" style={{ cursor: 'pointer' }}>
              <Button variant="light" className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="bi bi-bell fs-5 text-secondary"></i>
              </Button>
              {alertCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute translate-middle-y start-50 top-0 mt-1"
                  style={{ fontSize: '0.65rem', padding: '0.25em 0.5em' }}
                >
                  {alertCount}
                </Badge>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-lg border-0 mt-2 py-0" style={{ width: '280px', borderRadius: '12px' }}>
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">Notifications</span>
                {alertCount > 0 && <Badge bg="danger-light" className="text-danger fw-semibold">{alertCount} Urgent</Badge>}
              </div>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {alertCount === 0 ? (
                  <div className="p-4 text-center text-muted" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-bell-slash fs-2 mb-2 d-block text-muted opacity-50"></i>
                    No alerts or overdue tasks.
                  </div>
                ) : (
                  <>
                    {overdueTasks.map((t) => (
                      <Dropdown.Item key={t.id} as={Link} to="/tasks" className="p-3 border-bottom d-flex gap-2 text-wrap">
                        <div className="text-danger mt-0.5"><i className="bi bi-exclamation-circle-fill"></i></div>
                        <div>
                          <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.85rem' }}>Overdue: {t.title}</p>
                          <small className="text-danger" style={{ fontSize: '0.75rem' }}>Due date: {t.dueDate}</small>
                        </div>
                      </Dropdown.Item>
                    ))}
                    {dueTodayTasks.map((t) => (
                      <Dropdown.Item key={t.id} as={Link} to="/tasks" className="p-3 border-bottom d-flex gap-2 text-wrap">
                        <div className="text-warning mt-0.5"><i className="bi bi-clock-fill"></i></div>
                        <div>
                          <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.85rem' }}>Due Today: {t.title}</p>
                          <small className="text-warning" style={{ fontSize: '0.75rem' }}>Action required today</small>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </>
                )}
              </div>
              {alertCount > 0 && (
                <Dropdown.Item as={Link} to="/tasks" className="text-center py-2.5 text-primary fw-semibold border-top" style={{ fontSize: '0.8rem' }}>
                  View All Urgent Tasks
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          {/* User Profile Info */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-primary-light text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm border border-primary border-opacity-10"
              style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}
            >
              AY
            </div>
            <div className="d-none d-lg-block text-start leading-none" style={{ lineHeight: '1.2' }}>
              <span className="d-block fw-bold text-dark" style={{ fontSize: '0.85rem' }}>Amarjit yadav</span>
              <span className="text-muted" style={{ fontSize: '0.7rem' }}>Administrator</span>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
