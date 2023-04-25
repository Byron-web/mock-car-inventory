import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

function Cars() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setBackendData(backendData.filter((car) => car._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
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
                <Button variant="danger" onClick={() => handleDelete(car._id)}>
                  Delete
                </Button>{" "}
                <Button variant="success">Edit</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Cars;
