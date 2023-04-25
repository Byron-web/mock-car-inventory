import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Cars from "./components/Cars";

//Defines the main function component named App.
function App() {
  // Renders the card components for each object in the state array along with the input fields for adding a new card.
  return (
    <Container>
      <Cars />
    </Container>
  );
}

export default App;

/* 
  Source >>

*/
