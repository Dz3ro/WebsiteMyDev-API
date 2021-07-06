const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const msg400 = "Bad request";
const msg400InData = "Item already exists in database";
const msg500 = "Something went wrong";

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const usersToDisplay = [];

    for (const user of users) {
      const x = { _id: user._id, email: user.email, __v: user.__v };
      usersToDisplay.push(x);
    }
    res.send(usersToDisplay);
  } catch (e) {
    console.log("failed getting users", e);
    res.status(500).send(msg500);
  }
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  try {
    const userInData = await User.findOne({ email: req.body.email });
    if (userInData) return res.status(400).send(msg400InData);
  } catch (e) {
    return res.status(500).send(msg500);
  }
  const password = await getHashedPassword(req.body.password);
  const user = new User({ email: req.body.email, password });

  try {
    await user.validate();
  } catch (e) {
    console.log("did not pass mongoose validation at posting", e);
    return res.status(400).send(msg400);
  }
  try {
    const result = await user.save();
    res.send(result);
  } catch (e) {
    console.log("failed to post user");
    res.status(500).send(msg500);
  }
});

module.exports = router;
