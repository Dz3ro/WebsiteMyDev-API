const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");

const msg400 = "Bad request";
const msg400InData = "Item already exists in database";
const msg404 = "Could not find item in database";
const msg500 = "Something went wrong";

router.post("/", async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  let userInData;
  try {
    userInData = await User.findOne({ email: req.body.email });
    if (!userInData) return res.status(400).send(msg400InData);
  } catch (e) {
    return res.status(500).send(msg500);
  }

  const valid = await passwordIsValid(req.body.password, userInData.password);

  if (!valid) return res.status(400).send(msg400InData);
  const token = userInData.generateAuthToken();
  const userDisplay = {
    _id: userInData._id,
    email: userInData.email,
    __v: userInData.__v,
  };
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send(userDisplay);
});

module.exports = router;
