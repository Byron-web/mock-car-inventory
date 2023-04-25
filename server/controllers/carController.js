const Car = require("../models/carModel");

exports.findAll = function (req, res) {
  Car.find(function (err, cars) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving cars" });
    } else {
      res.send(cars);
    }
  });
};
