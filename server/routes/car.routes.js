const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");

// Find all cars
router.get("/", carController.findAll);

// Find car by id
router.get("/:id", carController.findById);

// Create a car
router.post("/", carController.create);

// Update many cars
router.put("/bulk", carController.updateBulk);

// Update a car
router.put("/:id", carController.update);

// Deleta a car by id
router.delete("/:id", carController.deleteById);

module.exports = router;
