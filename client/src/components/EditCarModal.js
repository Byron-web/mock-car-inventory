import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditCarModal = ({ car, show, onClose }) => {
  const [editCar, setEditCar] = useState(car);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditCar({ ...editCar, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // TODO: Implement the update functionality
    onClose();
  };

  const handleCreate = (event) => {
    event.preventDefault();
    // TODO: Implement the create functionality
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editCar._id ? "Edit Car" : "Create Car"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={editCar._id ? handleUpdate : handleCreate}>
        <Modal.Body>
          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter model"
              name="model"
              value={editCar.model}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group controlId="make">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter make"
              name="make"
              value={editCar.make}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter color"
              name="color"
              value={editCar.color}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group controlId="owner">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter owner"
              name="owner"
              value={editCar.owner}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group controlId="registration">
            <Form.Label>Registration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter registration"
              name="registration"
              value={editCar.registration}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={editCar.address}
              onChange={handleEditInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {editCar._id ? "Update Car" : "Create Car"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditCarModal;
