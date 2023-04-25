import React from "react";
import { Table } from "react-bootstrap";

function IdSearchResult({ car }) {
  if (!car) {
    return null;
  }

  return (
    <Table className="mt-3" striped bordered hover>
      <thead>
        <tr>
          <th>Model</th>
          <th>Make</th>
          <th>Color</th>
          <th>Owner</th>
          <th>Registration</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{car.model}</td>
          <td>{car.make}</td>
          <td>{car.color}</td>
          <td>{car.owner}</td>
          <td>{car.registration}</td>
          <td>{car.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default IdSearchResult;
