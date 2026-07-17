import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75"
        style={{ zIndex: 9999 }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-secondary fw-semibold">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5 w-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
