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

  const handleEdit = async (car) => {
    console.log("Editing car:", car);
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${car._id}`);
      const data = await response.json();
      setEditCar(data);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditCar({ ...editCar, [name]: value });
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
                  <Button variant="success" onClick={() => handleEdit(car)}>
                    Edit
                  </Button>
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
          <Modal.Title>{editCar._id ? "Edit Car" : "Create Car"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editCar._id ? handleEdit : handleCreate}>
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
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editCar._id ? "Update Car" : "Create Car"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Cars;
