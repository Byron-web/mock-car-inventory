const Car = require("../models/car.model");

exports.findAll = async (req, res) => {
  try {
    var cars = await Car.find();
    res.send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to find all cars" });
  }
};

exports.findById = async (req, res) => {
  try {
    var car = await Car.findById(req.params.id);
    if (!!car) {
      res.send(car);
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: `Failed to find car by id: [${req.params.id}]` });
  }
};

exports.create = async (req, res) => {
  try {
    var newCar = new Car(req.body);
    var id = await newCar.save();
    res.send(id);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to create car" });
  }
};

exports.update = async (req, res) => {
  try {
    var id = await Car.findByIdAndUpdate(req.params.id, req.body);
    res.send(id);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: `Failed to update car by id: [${req.params.id}]` });
  }
};

exports.updateBulk = async (req, res) => {
  try {
    for (const doc of req.body) {
      await Car.findByIdAndUpdate(doc._id, doc);
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Failed to update cars` });
  }
};

exports.deleteById = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: `Failed to delete car by id: [${req.params.id}]` });
  }
};
