import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, onConfirm, title, body }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-5 fw-bold text-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {title || 'Confirm Action'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <p className="text-secondary mb-0">{body || 'Are you sure you want to proceed?'}</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={onHide} className="fw-semibold">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="fw-semibold px-3">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
