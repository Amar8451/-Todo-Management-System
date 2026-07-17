import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center min-vh-75">
      <div 
        className="bg-danger-light text-danger rounded-circle d-flex align-items-center justify-content-center mb-4" 
        style={{ width: '80px', height: '80px', backgroundColor: 'var(--danger-light)' }}
      >
        <i className="bi bi-exclamation-octagon fs-1"></i>
      </div>
      <h1 className="display-4 fw-extrabold text-dark mb-2">404</h1>
      <h2 className="fs-4 fw-bold text-secondary mb-3">Page Not Found</h2>
      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '460px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button as={Link} to="/" variant="primary" className="btn-primary-custom px-4 fw-semibold py-2">
        <i className="bi bi-house-door-fill me-1.5"></i>
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
