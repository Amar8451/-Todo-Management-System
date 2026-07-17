import React from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

const Settings = () => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="fs-3 mb-1">Settings</h1>
        <p className="text-secondary mb-0">Manage system settings and learn about application shortcuts.</p>
      </div>

      <Row className="g-4">
        {/* Keyboard Shortcuts */}
        <Col xs={12} lg={6}>
          <Card className="border shadow-sm rounded-3">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark">
                <i className="bi bi-keyboard me-2 text-primary"></i>Keyboard Shortcuts
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Focus Search Input</span>
                  <kbd className="bg-light text-dark border shadow-sm">/</kbd>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Create New Task</span>
                  <div>
                    <kbd className="bg-light text-dark border shadow-sm">Shift</kbd> + <kbd className="bg-light text-dark border shadow-sm">N</kbd>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Go to Dashboard</span>
                  <div>
                    <kbd className="bg-light text-dark border shadow-sm">Shift</kbd> + <kbd className="bg-light text-dark border shadow-sm">D</kbd>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Go to All Tasks</span>
                  <div>
                    <kbd className="bg-light text-dark border shadow-sm">Shift</kbd> + <kbd className="bg-light text-dark border shadow-sm">A</kbd>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Application Details */}
        <Col xs={12} lg={6}>
          <Card className="border shadow-sm rounded-3">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark">
                <i className="bi bi-info-circle me-2 text-primary"></i>Application Status
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Version</span>
                  <span className="fw-bold text-secondary">1.0.0</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>API Connection</span>
                  <span className="badge bg-success-light text-success fw-semibold">Connected (Port 5000)</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Database State</span>
                  <span className="text-secondary fw-semibold">Local JSON DB</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2.5 px-0 border-bottom">
                  <span>Engine</span>
                  <span className="text-secondary fw-semibold">React Vite 8</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
