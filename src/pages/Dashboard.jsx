import React from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { isOverdue, isDueToday, formatDate } from '../utils/helpers';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle
} from 'chart.js';

// Register ChartJS elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartTitle);

const Dashboard = () => {
  const { tasks, activities, loading } = useTasks();

  // 1. Calculations for Metric Cards
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'High').length;
  const overdueTasks = tasks.filter(isOverdue);
  const dueTodayTasks = tasks.filter(isDueToday);

  // 2. Alert notifications (overdue and due today tasks)
  const urgentTasks = [...overdueTasks, ...dueTodayTasks];

  // 3. Chart Data: Status (Completed vs Pending)
  const statusChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#16a34a', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // 4. Chart Data: Priority Distribution
  const highCount = tasks.filter((t) => t.priority === 'High').length;
  const medCount = tasks.filter((t) => t.priority === 'Medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'Low').length;

  const priorityChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks',
        data: [highCount, medCount, lowCount],
        backgroundColor: ['#dc2626', '#f59e0b', '#06b6d4'],
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  // 5. Chart Data: Categories Distribution
  const categoriesMap = {};
  tasks.forEach((t) => {
    if (t.category) {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + 1;
    }
  });
  const catLabels = Object.keys(categoriesMap);
  const catCounts = Object.values(categoriesMap);

  const categoryChartData = {
    labels: catLabels.length > 0 ? catLabels : ['None'],
    datasets: [
      {
        label: 'Tasks by Category',
        data: catCounts.length > 0 ? catCounts : [0],
        backgroundColor: '#2563eb',
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  // 6. Chart Custom Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          color: '#475569',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#94a3b8' },
        grid: { color: '#f1f5f9' },
      },
      x: {
        ticks: { color: '#475569', font: { weight: '600' } },
        grid: { display: false },
      },
    },
  };

  // Stat cards metadata
  const metricCards = [
    {
      title: 'Total Tasks',
      count: totalTasks,
      icon: 'bi-grid-fill',
      colorClass: 'text-primary',
      bgLight: 'var(--primary-light)',
      to: '/tasks',
    },
    {
      title: 'Completed Tasks',
      count: completedTasks,
      icon: 'bi-check-circle-fill',
      colorClass: 'text-success',
      bgLight: 'var(--success-light)',
      to: '/completed',
    },
    {
      title: 'Pending Tasks',
      count: pendingTasks,
      icon: 'bi-hourglass-split',
      colorClass: 'text-warning',
      bgLight: 'var(--warning-light)',
      to: '/pending',
    },
    {
      title: 'High Priority',
      count: highPriorityTasks,
      icon: 'bi-flag-fill',
      colorClass: 'text-danger',
      bgLight: 'var(--danger-light)',
      to: '/high-priority',
    },
    {
      title: 'Due Today',
      count: dueTodayTasks.length,
      icon: 'bi-calendar-event-fill',
      colorClass: 'text-warning',
      bgLight: '#fffbeb',
      to: '/tasks',
    },
    {
      title: 'Overdue Tasks',
      count: overdueTasks.length,
      icon: 'bi-calendar-x-fill',
      colorClass: 'text-danger',
      bgLight: '#fef2f2',
      to: '/tasks',
    },
  ];

  return (
    <div>
      {/* Welcome Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fs-3 mb-1">Dashboard</h1>
          <p className="text-secondary mb-0">Welcome back, John! Here is your workspace summary.</p>
        </div>
        <Link to="/add" className="btn btn-primary-custom d-flex align-items-center gap-1.5 py-2">
          <i className="bi bi-plus-lg"></i>
          <span>Create Task</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <Row className="g-3 mb-4">
        {metricCards.map((card, idx) => (
          <Col xs={12} sm={6} md={4} xl={2} key={idx}>
            <Link to={card.to} className="text-decoration-none">
              <div className="stat-card">
                <div 
                  className="stat-icon-box" 
                  style={{ backgroundColor: card.bgLight }}
                >
                  <i className={`bi ${card.icon} ${card.colorClass}`}></i>
                </div>
                <div>
                  <span className="text-muted small d-block fw-semibold mb-0.5">{card.title}</span>
                  <span className="fs-4 fw-extrabold text-dark leading-none">{card.count}</span>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Urgent Alerts Row */}
      {urgentTasks.length > 0 && (
        <Alert variant="danger" className="border-0 shadow-sm rounded-3 mb-4 p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div className="d-flex align-items-center gap-2.5">
            <i className="bi bi-exclamation-octagon-fill fs-4 text-danger"></i>
            <div>
              <h6 className="alert-heading mb-0.5 fw-bold">Urgent Action Items</h6>
              <p className="mb-0 small text-secondary">
                You have <strong>{overdueTasks.length} overdue tasks</strong> and <strong>{dueTodayTasks.length} tasks due today</strong> that require attention.
              </p>
            </div>
          </div>
          <Link to="/tasks" className="btn btn-sm btn-outline-danger fw-semibold text-nowrap">
            View Urgent Tasks
          </Link>
        </Alert>
      )}

      {/* Main Charts & Activity Feed Grid */}
      <Row className="g-4 mb-4">
        {/* Status Chart */}
        <Col xs={12} lg={4}>
          <Card className="border shadow-sm h-100 rounded-3">
            <Card.Body className="d-flex flex-column">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Task Completion Status</h6>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: '220px' }}>
                {totalTasks === 0 ? (
                  <span className="text-muted small">No tasks logged yet</span>
                ) : (
                  <div className="w-100 h-100" style={{ position: 'relative', height: '220px' }}>
                    <Doughnut data={statusChartData} options={chartOptions} />
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Priority Bar Chart */}
        <Col xs={12} lg={4}>
          <Card className="border shadow-sm h-100 rounded-3">
            <Card.Body className="d-flex flex-column">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Priority Distribution</h6>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: '220px' }}>
                {totalTasks === 0 ? (
                  <span className="text-muted small">No tasks logged yet</span>
                ) : (
                  <div className="w-100 h-100" style={{ position: 'relative', height: '220px' }}>
                    <Bar data={priorityChartData} options={barChartOptions} />
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Categories Bar Chart */}
        <Col xs={12} lg={4}>
          <Card className="border shadow-sm h-100 rounded-3">
            <Card.Body className="d-flex flex-column">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Category Breakdown</h6>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: '220px' }}>
                {totalTasks === 0 ? (
                  <span className="text-muted small">No tasks logged yet</span>
                ) : (
                  <div className="w-100 h-100" style={{ position: 'relative', height: '220px' }}>
                    <Bar data={categoryChartData} options={barChartOptions} />
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity & Critical List */}
      <Row className="g-4">
        {/* Recent Activity */}
        <Col xs={12} lg={6}>
          <Card className="border shadow-sm rounded-3 h-100">
            <Card.Body>
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                <i className="bi bi-clock-history me-1.5 text-primary"></i>Recent Activity Feed
              </h6>
              {activities.length === 0 ? (
                <p className="text-muted py-4 text-center mb-0 small">No recent activity logged</p>
              ) : (
                <div className="activity-list ps-3 pt-1">
                  {activities.slice(0, 5).map((act, index) => (
                    <div className="activity-item" key={act.id || index}>
                      <span className="text-dark d-block fw-semibold" style={{ fontSize: '0.85rem' }}>{act.text}</span>
                      <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {new Date(act.timestamp).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Critical Tasks Due List */}
        <Col xs={12} lg={6}>
          <Card className="border shadow-sm rounded-3 h-100">
            <Card.Body>
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                <i className="bi bi-exclamation-triangle me-1.5 text-danger"></i>Critical Action Required
              </h6>
              {urgentTasks.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle-fill text-success fs-3 mb-2 d-block"></i>
                  <span className="text-success fw-semibold small">All clear! No overdue or due today items.</span>
                </div>
              ) : (
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {urgentTasks.slice(0, 4).map((t) => {
                    const overdue = isOverdue(t);
                    return (
                      <div 
                        key={t.id} 
                        className="d-flex justify-content-between align-items-center p-2.5 mb-2.5 border rounded bg-light bg-opacity-50"
                      >
                        <div>
                          <span className="fw-semibold text-dark d-block" style={{ fontSize: '0.85rem' }}>{t.title}</span>
                          <span className="badge bg-secondary-light text-secondary border px-1.5 py-0.5 mt-1" style={{ fontSize: '0.62rem' }}>
                            {t.category}
                          </span>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${overdue ? 'bg-danger-light text-danger border border-danger border-opacity-10' : 'bg-warning-light text-warning border border-warning border-opacity-10'} fw-bold px-2 py-1`} style={{ fontSize: '0.72rem' }}>
                            {overdue ? 'Overdue' : 'Due Today'}
                          </span>
                          <span className="d-block text-muted small mt-1" style={{ fontSize: '0.7rem' }}>
                            {formatDate(t.dueDate)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
