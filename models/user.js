const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const tokenKey = process.env.JWT_KEY;

const schemaUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
    tirm: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
    tirm: true,
  },
});

schemaUser.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, tokenKey);
  return token;
};

const User = mongoose.model("Users", schemaUser);

validate = (object) => {
  const schema = Joi.object({
    email: Joi.string().required().min(1).max(255),
    password: Joi.string().required().min(1).max(255),
  });

  return schema.validate(object);
};

getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

passwordIsValid = async (password, passwordHashed) => {
  const isValid = await bcrypt.compare(password, passwordHashed);
  return isValid;
};

module.exports.User = User;
module.exports.validate = validate;
module.exports.getHashedPassword = getHashedPassword;
module.exports.passwordIsValid = passwordIsValid;
