const Joi = require("joi");
const mongoose = require("mongoose");

const strReq = {
  type: String,
  minLength: 5,
  maxLength: 200,
  default: null,
};

const schemaProject = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
    tirm: true,
  },
  tools: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    minlength: 1,
    maxLength: 1000,
    trim: true,
  },
  urlImgMain: strReq,
  urlImgSec: strReq,
  urlImgAll: { type: [strReq], default: null },
  urlCode: strReq,
  urlLive: strReq,
});

const Project = mongoose.model("Projects", schemaProject);

validate = (object) => {
  const urlVal = Joi.string().min(5).max(200);

  const schema = Joi.object({
    name: Joi.string().required().min(1).max(20),
    tools: Joi.array().required(),
    description: Jaoi.string().min(1).max(1000),
    urlImgMain: urlVal,
    urlImgSec: urlVal,
    urlImgAll: Joi.array().items(urlVal),
    urlCode: urlVal,
    urlLive: urlVal,
  });

  return schema.validate(object);
};

module.exports.Project = Project;
module.exports.validate = validate;
