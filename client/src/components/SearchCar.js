import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import IdSearchResult from "./IdSearchResult";

function SearchCar() {
  const [id, setId] = useState("");
  const [car, setCar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="d-flex">
        <Form.Control
          type="text"
          placeholder="Enter car id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="me-2"
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>
      <IdSearchResult car={car} />
    </div>
  );
}

export default SearchCar;
