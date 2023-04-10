import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  title: string;
  body: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ModalComp = ({ title, body, onConfirm, onCancel }: Props) => {
  const handleClose = () => {
    if (onCancel !== undefined) onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm !== undefined) onConfirm();
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
