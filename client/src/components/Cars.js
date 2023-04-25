import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

function Cars() {
  const [backendData, setBackendData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    model: "",
    make: "",
    color: "",
    owner: "",
    registration: "",
    address: "",
  });
  const [editCar, setEditCar] = useState({
    model: "",
    make: "",
    color: "",
    owner: "",
    registration: "",
    address: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleCreate = () => {
    fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendData([...backendData, data]);
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedCars = backendData.filter((car) => car._id !== id);
          setBackendData(updatedCars);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>model</th>
            <th>make</th>
            <th>color</th>
            <th>owner</th>
            <th>registration</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {backendData.map((car, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{car.model}</td>
              <td>{car.make}</td>
              <td>{car.color}</td>
              <td>{car.owner}</td>
              <td>{car.registration}</td>
              <td className="d-flex justify-content-between align-items-center">
                {car.address}
                <div>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button variant="success">Edit</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleShowModal}>
        Create Car
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Car</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreate}>
          <Modal.Body>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Enter car model"
                value={newCar.model}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                name="make"
                placeholder="Enter car make"
                value={newCar.make}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                placeholder="Enter car color"
                value={newCar.color}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="owner">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                placeholder="Enter owner name"
                value={newCar.owner}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="registration">
              <Form.Label>Registration</Form.Label>
              <Form.Control
                type="text"
                name="registration"
                placeholder="Enter car registration number"
                value={newCar.registration}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter owner address"
                value={newCar.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Cars;
