const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const validateRegisterInput = require("../validation/registerValidation");

// @route   GET /api/auth/test
// @desc    Test the auth route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// @route   POST /api/auth/register
// @desc    Create a new car
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // check for existing owner
    const existingOwner = await Car.findOne({
      Owner: new RegExp("^" + req.body.Owner + "$", "i"),
    });

    if (existingOwner) {
      return res
        .status(400)
        .json({ error: "There is already an owner for this car" });
    }

    // create a new car
    const newCar = new Car({
      model: req.body.model,
      make: req.body.make,
      Color: req.body.Color,
      Owner: req.body.Owner,
      Registration: req.body.Registration,
      Address: req.body.Address,
    });

    // save the car to the database
    const savedCar = await newCar.save();

    // return the new car
    return res.json(savedCar);
  } catch (err) {
    console.log(err);

    res.status(500).send(err.message);
  }
});

module.exports = router;
