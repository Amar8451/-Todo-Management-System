import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-3 mt-auto text-secondary" style={{ fontSize: '0.85rem' }}>
      <Container fluid className="px-4">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <span className="fw-semibold text-primary">TaskFlow</span> &copy; {new Date().getFullYear()} — Premium Todo Management Dashboard.
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 text-muted">
              <span><kbd className="bg-light text-dark border shadow-sm">Shift</kbd> + <kbd className="bg-light text-dark border shadow-sm">N</kbd> Create</span>
              <span><kbd className="bg-light text-dark border shadow-sm">/</kbd> Search</span>
              <span><kbd className="bg-light text-dark border shadow-sm">Shift</kbd> + <kbd className="bg-light text-dark border shadow-sm">D</kbd> Dashboard</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
