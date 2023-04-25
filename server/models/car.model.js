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
    color: {
      type: String,
      required: false,
    },
    owner: {
      type: String,
      required: true,
    },
    registration: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("cars", CarSchema);
