import React from "react";
import { Modal } from "react-bootstrap";

export default function myModel({
  onHide,
  show,
  title,
  points,
  mistakes,
  statistics,
  handleShow,
  modalBody,
  modalData
}) {
  const { body1, body2, body3 } = modalBody;
  const { val1, val2, val3 } = modalData;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>{title}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>
          {body1} {val1}
        </h3>
      </Modal.Body>
      <Modal.Body>
        <h3>
          {body2} {val2}
        </h3>
      </Modal.Body>
      <Modal.Body>
        <h3>
          {body3} {val3}
        </h3>
      </Modal.Body>
    </Modal>
  );
}
