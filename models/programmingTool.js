const Joi = require("joi");
const mongoose = require("mongoose");

const schemaProgrammingTool = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20,
    tirm: true,
  },
});

const ProgrammingTool = mongoose.model(
  "Programming tools",
  schemaProgrammingTool
);

validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(20),
  });

  return schema.validate(object);
};

module.exports.ProgrammingTool = ProgrammingTool;
module.exports.validate = validate;
