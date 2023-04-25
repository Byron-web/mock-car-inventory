const { Schema, model } = require("mongoose");

const CarSchema = new Schema(
  {
    model: {
      type: Number,
      required: false,
    },
    make: {
      type: String,
      required: true,
    },
    Color: {
      type: String,
      required: false,
    },
    Owner: {
      type: String,
      required: true,
    },
    Registration: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = model("Car", CarSchema);
module.exports = Car;
