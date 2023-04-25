const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  // check make field
  if (isEmpty(data.make)) {
    errors.make = "make field cannot be empty";
  }

  // check the owner field
  if (isEmpty(data.Owner)) {
    errors.Owner = "Owner field cannot be empty";
  }

  // check registration field
  if (isEmpty(data.Registration)) {
    errors.Registration = "Registration field cannot be empty";
  } else if (!Validator.isLength(data.Registration, { min: 9, max: 10 })) {
    errors.Registration =
      "Registration must be between 9 and 10 characters long";
  }
  if (isEmpty(data.Address)) {
    // check make field
    errors.Address = "Address field cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;

//Delete the "people" collection and only use "cars".
